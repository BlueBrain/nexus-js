import React from "react";
import FontAwesome from "react-fontawesome";
import ImageAttachment from "./ImageAttachment.jsx";
import TextAttachment from "./TextAttachment.jsx";

/**
 * Takes a mediaType (mimeType file extension) then resolves a preview or null
 * @param {*} mediaType
 * @param {*} downloadURL
 * @return <ImageAttachment> or null
 */
const Preview = (mediaType, downloadURL) => {
  if (!mediaType) { return; }
  const mimeType = mediaType.split(";")[0];
  if (mimeType === "image/jpeg" || mimeType === "image/png") {
    return (
      <ImageAttachment src={downloadURL} render={
        ({imageData}) => {
          if (imageData) {
            return (<div
              className="media-preview loaded"
              style={{ backgroundImage: `url(${imageData})` }}
            />);
          } else {
            return (<div className="media-preview loading" />);
          }
        }}
        />
    );
  }
  if (mimeType === "text/plain") {
    return (
      <TextAttachment src={downloadURL} render={
        ({textData}) =>
          <div className="file-preview"><FontAwesome name="file" /></div>
        }
        />
    )
  }
  return;
};

export default Preview