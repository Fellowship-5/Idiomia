import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import Section from "./../../components/Section";
import Breadcrumb from "./../../components/Breadcrumb";
import FlexTable from "./../../components/FlexTable";
import Pagination from "./../../components/Pagination";
import Spinner from "./../../components/Spinner";
import Modal from "./../../components/Modal";
import Button from "./../../components/Button";
import UpdateProverb from "./../proverb/UpdateProverb";
import AddProverb from "./../proverb/AddProverb";
import { userDashboardTitle } from "./../../helpers/flexTableData";
import {
  useAuth,
  useProverb,
  usePagination,
  useLocation,
} from "./../../redux/hooks";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, loading: userLoading } = useAuth();
  const {
    loading: proverbLoading,
    getUserProverbs,
    userProverbs,
    deleteProverb,
    getProverb,
    proverb,
    totalPages,
  } = useProverb();
  const {
    activePage,
    pageSize,
    pageItems,
    setPage,
    pageReset,
    setPageReset,
    setPageItems,
  } = usePagination();
  const history = useHistory();
  const { setLocationChanged } = useLocation();

  useEffect(
    function listenLocationChanges() {
      return history.listen(() => {
        setLocationChanged();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setLocationChanged]
  );

  //Modal States
  const [modal, setModal] = useState({
    isOpen: false,
    type: undefined,
  });
  //Modal Handlers
  const handleShowModal = (type) => {
    if (type === "update") {
      setModal({
        isOpen: true,
        type: "update",
      });
    }
    if (type === "delete") {
      setModal({
        isOpen: true,
        type: "delete",
      });
    }
    if (type === "add") {
      setModal({
        isOpen: true,
        type: "add",
      });
    }
  };
  const handleCloseModal = () => {
    setModal({ isOpen: false, type: undefined });
  };

  useEffect(
    function fetchUserProverbs() {
      getUserProverbs(activePage, pageSize);
    },
    [getUserProverbs, activePage, pageSize]
  );

  // Icon Click Handlers
  const handleIconClick = (e) => {
    const id = e.target?.id;
    const icon = e.target?.textContent;
    getProverb(id);

    switch (icon) {
      case "Edit":
        handleShowModal("update");
        break;
      case "TrashAlt":
        handleShowModal("delete");
        break;
      default:
        break;
    }
  };
  //Delete button handler
  const handleDeleteProverb = (id) => async (e) => {
    e.preventDefault();
    await deleteProverb(id);
    handleCloseModal();
  };

  const selectModalChildren = () => {
    if (modal.type === "update") {
      if (proverb.adminApproval) {
        return (
          <div>
            <p className="lead ml-2">
              It is not allowed to update approved proverb.
            </p>
            <Button
              variant="info"
              text="Close"
              onClick={handleCloseModal}
              color="white"
              type="submit"
              className="button-custom p-2 float-right mb-2 mr-2"
              id="user-dashboard-modal-confirm-button"
            />
          </div>
        );
      }

      return (
        <UpdateProverb
          handleCloseModal={handleCloseModal}
          actionType="Update"
        />
      );
    }

    if (modal.type === "delete") {
      return (
        <div>
          <p className="lead ml-2">Do you want to delete your proverb?</p>
          <Button
            variant="info"
            text="Delete"
            onClick={handleDeleteProverb(proverb._id)}
            color="white"
            type="submit"
            className="button-custom p-2 float-right mb-2 mr-2"
            id="user-dashboard-modal-delete-button"
          />
        </div>
      );
    }
    if (modal.type === "add") {
      return (
        <AddProverb handleCloseModal={handleCloseModal} actionType="Add" />
      );
    }
    return null;
  };

  if (proverbLoading && pageItems.length === 0) {
    return (
      <div className="position-absolute" style={{ top: "50%", left: "50%" }}>
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        modalClose={handleCloseModal}
        centered={true}
        dialogClassName={`${modal.type}-proverb-modal`}
      >
        {selectModalChildren()}
      </Modal>
      <Section
        id="page-title"
        title={!userLoading && `${user?.name} DASHBOARD`}
      >
        <Breadcrumb activePage="Dashboard" />
      </Section>

      <Container>
        <div className="d-flex justify-content-between flex-column-reverse flex-sm-row">
          <Pagination
            id="proverb-list-top-table-pagination"
            items={userProverbs}
            setActivePage={setPage}
            setActivePageItems={setPageItems}
            pageSize={pageSize}
            activePage={activePage}
            paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
            shouldResetPagination={pageReset}
            setShouldResetPagination={setPageReset}
            totalPages={totalPages}
          />
          <Button
            variant="info"
            text="Add Proverb"
            onClick={() => handleShowModal("add")}
            color="white"
            type="submit"
            className="button-custom float-right m-5"
            id="user-dashboard-add-proverb-button"
          />
        </div>
        {pageItems.length ? (
          <FlexTable
            data={pageItems}
            titleData={userDashboardTitle}
            tableId={"proverb-list-flex-table"}
            iconClick={handleIconClick}
            tableType="user-dashboard-flexTable"
          />
        ) : (
          <h3 className="p-3 mt-2">You haven't added a proverb yet.</h3>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
