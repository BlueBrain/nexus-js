'use strict';

/**
 * Produce map shapeID - shape itself and its position in overall list.
 * @param {array} shapes - Array of shapes
 * @return {object} Map object key-value.
 */
function generateShapesMap(shapes) {
  if (shapes) {
    const map = {};
    shapes.forEach((shape, index) => {
      map[shape['@id']] = {
        value: shape,
        index: index
      };
    });
    return map;
  }
  return null;
}

/**
 * Remove duplicates which are embed already.
 * @param {object} jsonLD - Schema object
 * @param {array} markedShapes - Array of shape's indexes to delete
 * @return {object} Changed schema.
 */
function removeDuplicates(jsonLD, markedShapes) {
  jsonLD.shapes = jsonLD.shapes.filter((shape, index) => {
    if (!markedShapes.includes(index)) {
      return shape;
    }
  });
  return jsonLD;
}

/**
 * Produce nested schema instead of flat one.
 * @param {object} jsonLD - Schema object
 * @return {object} Changed schema.
 */
function embedNodeResolver(jsonLD) {
  //Array for potential elements to delete
  let markedShapes = [];
  //Create Map for faster connection between shapeID and shape itself
  const map = generateShapesMap(jsonLD.shapes);

  jsonLD.shapes.forEach(shape => {
    //if NodeShape contains property list because it may not have
    if (shape.property !== undefined) {
      shape.property.forEach(property => {
          //If property has embed node insinde
          if (property.node !== undefined) {
            const { value, index } = map[property.node];
            //inject shape itself instead of just an ID for this shape
            property.node = value;
            //push its position to special array for future deletion
            markedShapes.push(index);
          }
      });
    }
    //if NodeShape has reference to another NodeShape directly inside
    if (shape.node !== undefined) {
      const { value, index } = map[shape.node];
      //so inject node into node
      shape.node = value;
      //again recording position
      markedShapes.push(index);
    }
  });
  return removeDuplicates(jsonLD, markedShapes);
}

/**
 * Helper wrapper for importResolver function
 * @param {object} jsonLD - Schema object
 * @return {object} Changed schema.
 */
function importsResolver(jsonLD) {
  //check if weed to go further
  if (jsonLD.imports === undefined) {
    return jsonLD;
  }
  //create iterable structure of urls to import for more comfortable iterations
  const importsIterator = makeIterator(jsonLD.imports);
  return importResolver(importsIterator, jsonLD);
}

/**
 * Recursively resolve imports in each schema file and combine them together.
 * @param {iterable} url - Iterable array of urls
 * @param {object} jsonLD - Schema object
 * @return {object} Changed schema.
 */
async function importResolver(url, jsonLD) {
  //request imported schema and then check imports inside it
  const json = await fetch(url.next().value)
  .then(handleResponse)
  .then(importsResolver)
  .then(importedjson => {
    //merge context of both schemas
    jsonLD['@context'] = Object.assign(jsonLD['@context'], importedjson['@context']);
    //merge shapes of both schemas
    jsonLD.shapes = jsonLD.shapes.concat(importedjson.shapes);
    return jsonLD;
  })
  .catch(err => {
    console.log(err);
  });

  //If we finished to iterate through imports then return combined schema
  if (url.next().done) {
    return json;
  }
  else {
    //otherwise recursive call
    return importResolver(url, json);
  }
}

/**
 * Wrapper function for combined calling importsResolver and embedNodeResolver in chain
 * @param {object} jsonLD - Schema object
 * @return {Promise<object>} Changed schema.
 */
function getResolvedSchema(jsonLD) {
  return Promise
  .resolve(jsonLD)
  .then(importsResolver)
  .then(embedNodeResolver)
}

/**
 * Retrieve object with full record and short record of path
 * @param {string} path - path of property
 * @param {object} context - context of schema
 * @return {object} object with both ways of representing path
 */
function getPath(path, context) {
  //check if we have context
  if (!context) {
    throw new Error('You should pass the context');
    return;
  }
  const isURL = path.indexOf('http') !== -1;
  let shortPath, fullPath, pathArr;
  if (isURL) {
    pathArr = path.split('#');
    if (pathArr.length > 1) {
      shortPath = pathArr[1];
      fullPath = path;
    }
    else {
      pathArr = path.split('/');
      shortPath = pathArr[pathArr.length-1]?pathArr[pathArr.length-1]:pathArr[pathArr.length-2];
      fullPath = path;
    }
  }
  else {
    pathArr = path.split(':');
    if (pathArr.length > 1) {
      shortPath = pathArr[1];
      fullPath = context[pathArr[0]] + shortPath;
    }
    else {
      shortPath = path;
      fullPath = context[path];
    }
  }
  return { shortPath: shortPath, fullPath: fullPath };
}

/**
 * Retrieve value of particular propert
 * @param {object} data - instance object
 * @param {object} schema - schema object
 * @param {string} path - path of property
 * @param {object} parentShape - parent Shape for this property
 * @return {string} value of property
 */
function getValue(data, schema, path, parentShape) {
  if ((typeof data === 'string') || (typeof schema === 'string')) {
    throw new Error('inccorect arguments types');
    return;
  }
  //get path object for out property
  const pathObj = getPath(path, schema['@context']);
  //check if our potential property is on top level of instance object
  if (data[pathObj['shortPath']] !== undefined) {
    //check if it's Ontology term(label, @id)
    if (data[pathObj['shortPath']]['@id']) {
      return data[pathObj['shortPath']]['@id'];
    }
    else {
      return data[pathObj['shortPath']];
    }
  }
  else {
    //otherwise going deeper
    return getValueFromEmbedNodes(data, schema, pathObj, parentShape);
  }
}

/**
 * Find property value iterating over shapes
 * @param {object} data - instance object
 * @param {object} schema - schema object
 * @param {object} pathObj - path object of property
 * @param {object} parentShape - parent Shape for this property
 * @return {string} value of property
 */
function getValueFromEmbedNodes(data, schema, pathObj, parentShape) {
  const shapes = schema.shapes;
  const context = schema['@context'];
  let shape, result;
  for (let i = 0; i < shapes.length; i++) {
    shape = shapes[i];
    result = searchInShape(data, shape, context, pathObj, parentShape);
    if (result) {
      return result;
    }
  }
  return '';
}

/**
 * Find property value iterating over shapes
 * @param {object} data - instance object
 * @param {object} shape - particular nodeshape
 * @param {object} context - schema context
 * @param {string} pathObj - path of property
 * @param {object} parentShape - parent Shape for this property
 * @param {object} path - cached instance field(need for retrieving values from deeply nested instances)(optional)
 * @param {object} rootShape - parent shape of shape where we are looking for(optional)
 * @return {string} value of property
 */
function searchInShape(data, shape, context, pathObj, parentShape, path, rootShape) {
  let property;
  for (let i = 0; i < shape.property.length; i++) {
    property = shape.property[i];
    //retrieving path object for every iterated property
    const suspectedPathObj = getPath(property.path, context);
    //check if we have equal paths and they are located into the same shape
    if ((suspectedPathObj['fullPath'] === pathObj['fullPath'])
    && (getPath(shape['@id'], context)['fullPath'] === parentShape)) {
      //if it was first call(not recursive)
      if (!path) {
        if (isPropertyEmbedOrNodeKind(pathObj['shortPath'], shape)) {
          if (data[suspectedPathObj['shortPath']]) {
            return data[suspectedPathObj['shortPath']]['@id'];
          }
          else {
            return '';
          }
        }
        else {
          if (data[suspectedPathObj['shortPath']]) {
            return data[suspectedPathObj['shortPath']];
          }
          else {
            return '';
          }
        }
      }
      else {
        if (isPropertyEmbedOrNodeKind(pathObj['shortPath'], shape)) {
          return path[pathObj['shortPath']]['@id'];
        }
        else {
          return path[pathObj['shortPath']];
        }
      }
    }
    //if we have embed node in current property
    if (property.node) {
      //if it was first call
      if (!path) {
        //now cache our future path in instance for next call
        path = data[getPath(property.path, context)['shortPath']];//data[pathObj['shortPath']];
        //define rootshape as current shape because we'll go deeper
        rootShape = shape;
        const result = searchInShape(data, property.node, context, pathObj, parentShape, path, rootShape);
        if (result) {
          return result;
        }
        else {
          path = '';
        }
      }
      else {
        rootShape = shape;
        const result = searchInShape(data, property.node, context, pathObj, parentShape, path[suspectedPathObj['shortPath']], rootShape);
        if (result) {
          return result;
        }
        else {
          path = '';
        }
      }
    }
  }
}

/**
 * Check if property embed or has nodekind
 * @param {string} path - path
 * @param {object} shape - parent shape for passed property
 * @return {boolean} true or false
 */
function isPropertyEmbedOrNodeKind(path, shape) {
  let property;
  for (let i = 0; i < shape.property.length; i++) {
    property = shape.property[i];
    if (property.path.indexOf(path) !== -1) {
      if ((property.nodeKind) || (property.class && !property.node)){
        return true;
      }
    }
  }
  return false;
}

/**
 * Make flat list of all properties in schema
 * @param {string} path - path
 * @param {object} shape - parent shape for passed property
 * @return {object} true or false
 */
function getPropertyMap(schema) {
  if (typeof schema === 'string') {
    throw new Error('Schema should be object');
  }
  let map;
  const shapes = schema.shapes;
  const context = schema['@context'];
  schema.shapes.forEach(shape => {
    getPropertyMapFromShape(shape, context, map);
  });
  return map;
}

/**
 * Fill map of properties
 * @param {object} shape - parent shape
 * @param {object} context - schema context
 * @param {object} map - map object
 */
function getPropertyMapFromShape(shape, context, map) {
  let propertyObj;
  shape.property.forEach(property => {
    propertyObj = getPath(property.path, context);
    map[propertyObj['shortPath']] = property;
    if (property.node) {
      getPropertyMapFromShape(property.node, context, map);
    }
  });
}

/**
 * Get shape url for html element
 * @param {HTMLElement} element - parent shape
 * @return {string} url
 */
function getParentShapeInForm(element) {
  let parent = element.parentNode;
  if (parent.dataset.name === undefined) {
    return getParentShapeInForm(parent);
  }
  else {
    return parent.dataset.name;
  }
}

/**
 * Print schema in DOM appending element with class source
 * @param {object} obj - complex object with schema and its label
 * @return {object} schema
 */
function printSchema(obj) {
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  const code = document.createElement('code');
  summary.innerHTML = obj.label;
  code.innerHTML = JSON.stringify(obj.content);
  details.appendChild(summary);
  details.appendChild(code);
  document.querySelector('.source').appendChild(details);
  return obj.content;
}

/**
 * Helper function for handling responses from fetch
 * @param {object} response - server repsonse
 * @return {object} decoded response
 */
function handleResponse(response) {
  if (response.status == 200) {
    return response.json();
  }
  else {
    throw new Error(response.responseText);
  }
}

/**
 * Helper function for creating iterators structure
 * @param {array} array - source array
 * @return {iterable} iterable structure
 */
function makeIterator(array){
  let nextIndex = 0;

  return {
     next: () => {
       return nextIndex < array.length ?
           {value: array[nextIndex++], done: false} :
           {done: true};
     }
  }
}

module.exports = { getResolvedSchema, getValue, getPath, getParentShapeInForm, printSchema, handleResponse };
