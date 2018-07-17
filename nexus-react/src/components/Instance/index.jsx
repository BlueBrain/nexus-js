import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import InstanceHeader from "./Header.jsx";
import InstanceBody from "./Body.jsx";
import Modal from "react-responsive-modal";
import Links from "./Links.jsx";
// TODO maybe can speed up reactJSON views via webworkers somehow, or pre-load the UI?
import ReactJson from "react-json-view";

// TODO how do we want to display errors?
const InstanceComponent = (open, error, pending, data, goDown, goToEntityByID) => (
  <Modal
    open={open}
    onClose={goDown}
    showCloseIcon={!pending}
    classNames={{
      overlay: "instance-modal",
      modal: "instance-modal-container",
      closeIcon: "instance-close-icon"
    }}
  >
    {error && Failure(error)}
    {!error && (data ? Fulfilled(data, goToEntityByID) : Loading())}
  </Modal>
);

const Loading = () => (
  <div className="modal-message">
    <h4>loading...</h4>
  </div>
);

const Failure = error => (
  <div className="modal-message">
    <h4>There was an error processing this request.</h4>
    <p>{error.message}</p>
  </div>
);

const Fulfilled = (instance, goToEntityByID) => (
  <div className="instance flex center">
    <Links which="incoming" resolvedLinks={instance.resolvedLinks} goToEntityByID={goToEntityByID} />
    <div className="modal-content">
      <Tabs>
        <div className="modal-header">
          {InstanceHeader(instance)}
          <TabList>
            <Tab>Fields</Tab>
            <Tab>JSON preview</Tab>
          </TabList>
        </div>
        <div className="modal-body container">
          <TabPanel>{InstanceBody(instance, goToEntityByID)}</TabPanel>
          <TabPanel>
            <div className="json-viewer">
              <ReactJson src={instance} />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
    <Links which="outgoing" resolvedLinks={instance.resolvedLinks} goToEntityByID={goToEntityByID} />
  </div>
);

const InstanceContainer = props => {
  const { open, error, pending, data, goDown, goToEntityByID } = props;
  return InstanceComponent(open, error, pending, data, goDown, goToEntityByID);
};

InstanceContainer.propTypes = {
  open: PropTypes.bool,
  error: PropTypes.any,
  pending: PropTypes.bool,
  data: PropTypes.any,
  goDown: PropTypes.func.isRequired,
  goToEntityByID: PropTypes.func.isRequired,
};

function mapStateToInstanceContainerProps({ instance, pick }) {
  if (instance.data) {
    instance.data.metaFields = [
      "distribution",
      "@id",
      "@context",
      "@type",
      "nxv:deprecated",
      "nxv:rev",
      "links",
      "resolvedLinks",
      "metaFields",
      "numFields"
    ];
    instance.data.numFields = Object.keys(instance).filter(
      key => instance.data.metaFields.indexOf(key) < 0
    ).length;
  }
  return {
    ...instance,
    open: !!pick.instance
  };
}

export const mapStateToProps = mapStateToInstanceContainerProps;
export default InstanceContainer;
