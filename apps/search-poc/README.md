## Example queries:

### Thalamus Project

#### Emodels collection

```sparql
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:EModelCollection
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdf:label ?speciesLabel }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
```

#### Morphology Collections

```sparql
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:ReconstructedNeuronMorphologyCollection
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdf:label ?speciesLabel }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
```

#### Circuits

```sparql
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:detailedcircuit
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
```

#### Simulations

```sparql
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:simulation_campaign
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
```

#### Model Cell Collection

```sparql
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:ModelCellCollection
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
