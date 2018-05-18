import React from "react";
import FontAwesome from "react-fontawesome";
import prettyBytes from "pretty-bytes";
import ReactTooltip from "react-tooltip";
import { downloadAttachment } from "../../../../nexus-js-helpers";
import { WithStore } from "../";
import Preview from "./Preview.jsx";

const Distribution = distribution => {
  if (!distribution) {
    return;
  }
  const {
    downloadURL,
    contentSize,
    originalFileName,
    mediaType
  } = Array.isArray(distribution) ? distribution[0] : distribution;
  const [, fileType] = originalFileName? originalFileName.split(".") : downloadURL.split(".");
  return (
    <WithStore
      mapStateToProps={({ auth }) => ({
        token: auth.token
      })}
      mapDispatchToProps={{}}
    >
      {({ token }) => (
        <div className="property distribution bordered-box">
          <div className="handle" />
          <div className="container">
            <ReactTooltip
              id={originalFileName}
              className="small-tooltip"
              effect="solid"
            />
            <div
              className="category-icon"
              data-for={originalFileName}
              data-tip="attachment"
            >
              <FontAwesome name="paperclip" />
            </div>
            <div className="key ellipsis">{originalFileName}</div>
            {Preview(mediaType, downloadURL)}
            <div className="media-box">
              <div className="download">
                <a
                  onClick={fetchAttachment(
                    downloadURL,
                    originalFileName,
                    token
                  )}
                  download
                >
                  <FontAwesome name="download" /> download
                </a>
              </div>
              <div>
                {contentSize && <small>
                  <b>Size</b> {prettyBytes(contentSize.value)}
                </small>
                }
                <br />
                <small>
                  <b>Media Type</b> {fileType}
                </small>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
    </WithStore>
  );
};
/**
 * Download an attachment, including if restricted by ACLs
 *
 * We use the fetch API since for non-public attachments
 * we have to add the HTTP Authorization header to the request.
 *
 * @param {string} uri
 * @param {string} fileName
 */
function fetchAttachment(uri, fileName, token) {
  return () => {
    downloadAttachment(uri, fileName, token);
  };
}

export default Distribution;