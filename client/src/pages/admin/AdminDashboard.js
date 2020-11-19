import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Section from "../../components/Section";
import Breadcrumb from "../../components/Breadcrumb";
import ToggleSwitch from "../../components/ToggleSwitch";
import Spinner from "../../components/Spinner";
import ProgressBar from "../../components/ProgressBar";
import UpdateProverb from "../proverb/UpdateProverb";
import AddProverb from "../proverb/AddProverb";
import Search from "../home/Search";
import { adminDashboardTitle } from "../../helpers/flexTableData";
import {
  useProverb,
  useSearch,
  usePagination,
  useToggle,
  useLocation,
  useAuth,
} from "../../redux/hooks";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const searchTimeOut = useRef(null);

  const { loading: userLoading } = useAuth();

  const history = useHistory();
  const {
    loading: proverbLoading,
    getAllUserProverbs,
    allProverbs,
    approveUserProverb,
    deleteUserProverb,
    getProverbAdmin,
    proverb,
    totalPages,
    searchUserProverbs,
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

  const { field: searchField, searchTerm } = useSearch();
  const { label, value: toggleValue, setToggle } = useToggle();
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
    if (type === "approve") {
      setModal({
        isOpen: true,
        type: "approve",
      });
    }
    if (type === "delete") {
      setModal({
        isOpen: true,
        type: "delete",
      });
    }
  };
  const handleCloseModal = () => {
    setModal({ isOpen: false, type: undefined });
  };

  useEffect(
    function fetchAllUserProverbs() {
      if (!searchTerm) {
        if (toggleValue === 0) {
          getAllUserProverbs(activePage, pageSize);
        }
        if (toggleValue === 1) {
          getAllUserProverbs(activePage, pageSize, false);
        }
        if (toggleValue === 2) {
          getAllUserProverbs(activePage, pageSize, true);
        }
      }
    },
    [activePage, getAllUserProverbs, pageSize, searchTerm, toggleValue]
  );

  useEffect(
    function searchProverbs() {
      searchTimeOut.current = setTimeout(() => {
        if (searchTerm) {
          searchUserProverbs(activePage, pageSize, searchTerm, searchField);
        }
      }, 500);

      return () => {
        clearTimeout(searchTimeOut.current);
      };
    },
    [
      activePage,
      pageSize,
      searchField,
      searchTerm,
      searchUserProverbs,
      toggleValue,
    ]
  );

  useEffect(
    function shouldPaginationReset() {
      setPageReset(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleValue]
  );

  // Icon Click Handlers
  const handleIconClick = (e) => {
    const id = e.target?.id;
    const icon = e.target?.textContent;
    getProverbAdmin(id);

    switch (icon) {
      case "Edit":
        handleShowModal("update", id);
        break;
      case "TrashAlt":
        handleShowModal("delete", id);
        break;
      case "Plus":
      case "Minus":
        handleShowModal("approve", id);
        break;
      default:
        break;
    }
  };
  //Delete button handler
  const handleDeleteProverb = (id) => async (e) => {
    e.preventDefault();
    await deleteUserProverb(id);
    handleCloseModal();
  };

  //Approve button handler
  const handleApproveProverb = (id) => async (e) => {
    e.preventDefault();
    await approveUserProverb(!proverb.adminApproval, id);
    handleCloseModal();
  };

  const selectModalChildren = () => {
    if (modal.type === "update") {
      return (
        <UpdateProverb
          handleCloseModal={handleCloseModal}
          actionType="AdminUpdate"
        />
      );
    }
    if (modal.type === "approve") {
      const approveText = proverb.adminApproval ? "disapprove" : "approve";
      return (
        <div>
          <p className="lead ml-2">{`Do you want to ${approveText} the proverb?`}</p>
          <Button
            variant="info"
            text={approveText}
            onClick={handleApproveProverb(proverb._id, !proverb.adminApproval)}
            color="white"
            type="submit"
            className="button-custom p-2 float-right mb-2 mr-2"
            id="user-dashboard-modal-delete-button"
          />
        </div>
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
      return <AddProverb handleCloseModal={handleCloseModal} />;
    }
    return null;
  };

  if (proverbLoading && allProverbs.length === 0) {
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
        id="admin-dashboard-section"
        title={!userLoading && `ADMIN DASHBOARD`}
      >
        <Breadcrumb activePage="Admin" />
      </Section>
      <ProgressBar loading={proverbLoading} />

      <Container>
        <div className="d-flex justify-content-between admin-actions-section flex-column">
          <div className="d-flex flex-lg-row justify-content-between">
            <Search />
            <ToggleSwitch
              value={toggleValue}
              label={label}
              setToggle={setToggle}
              defaultOption="All"
              firstOption="Pending"
              secondOption="Approved"
            />
          </div>
          <div>
            <Pagination
              id="admin-dashboard-top-pagination"
              items={allProverbs}
              setActivePage={setPage}
              setActivePageItems={setPageItems}
              pageSize={pageSize}
              activePage={activePage}
              paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
              shouldResetPagination={pageReset}
              setShouldResetPagination={setPageReset}
              totalPages={totalPages}
            />
          </div>
        </div>
        {totalPages > 0 && (
          <FlexTable
            data={pageItems}
            titleData={adminDashboardTitle}
            tableId={"proverb-list-flex-table"}
            tableType="user-dashboard-flexTable"
            iconClick={handleIconClick}
          />
        )}
      </Container>
    </>
  );
};

export default AdminDashboard;
