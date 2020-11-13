import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Section from "../../components/Section";
import Breadcrumb from "../../components/Breadcrumb";
import ToggleSwitch from "../../components/ToggleSwitch";
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
  const { loading: userLoading } = useAuth();

  const history = useHistory();
  const {
    getAllUserProverbs,
    allProverbs,
    approveUserProverb,
    deleteUserProverb,
    getProverbAdmin,
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
  } = usePagination();

  const { filtered, isActive, searchTerm, setSearch } = useSearch();
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
      if (toggleValue === 0) {
        getAllUserProverbs(activePage, pageSize);
      }
      if (toggleValue === 1) {
        getAllUserProverbs(activePage, pageSize, false);
      }
      if (toggleValue === 2) {
        getAllUserProverbs(activePage, pageSize, true);
      }
    },
    [activePage, getAllUserProverbs, pageSize, toggleValue]
  );

  useEffect(
    function shouldPaginationReset() {
      setPageReset(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleValue]
  );

  useEffect(
    function searchProverbs() {
      if (searchTerm) {
        if (toggleValue === 0) {
          setSearch(searchTerm, allProverbs);
          return;
        }
        if (toggleValue === 1) {
          setSearch(
            searchTerm,
            allProverbs.filter((proverb) => !proverb.adminApproval)
          );
          return;
        }
        if (toggleValue === 2) {
          setSearch(
            searchTerm,
            allProverbs.filter((proverb) => proverb.adminApproval)
          );
          return;
        }
        return;
      }
    },
    [searchTerm, setSearch, allProverbs, toggleValue]
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
        title={!userLoading && `ADMIN DASHBOARD`}
        containerClass="d-flex justify-content-between mx-5 align-items-center"
      >
        <Breadcrumb activePage="Admin" />
      </Section>

      <Container>
        <div className="d-flex justify-content-between">
          <Search />
          <Pagination
            id="admin-dashboard-top-pagination"
            items={allProverbs}
            setActivePage={setPage}
            pageSize={pageSize}
            activePage={activePage}
            isSearchActive={isActive}
            paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
            shouldResetPagination={pageReset}
            setShouldResetPagination={setPageReset}
            totalPages={totalPages}
          />

          <div className="d-flex align-items-center">
            <ToggleSwitch
              value={toggleValue}
              label={label}
              setToggle={setToggle}
              defaultOption="All"
              firstOption="Pending"
              secondOption="Approved"
            />
          </div>
        </div>

        <FlexTable
          data={pageItems}
          titleData={adminDashboardTitle}
          tableId={"proverb-list-flex-table"}
          tableType="user-dashboard-flexTable"
          iconClick={handleIconClick}
        />
        {/* <Pagination
          id="admin-dashboard-top-pagination"
          items={paginationItems}
          setActivePage={setPage}
          pageSize={pageSize}
          activePage={activePage}
          isSearchActive={isActive}
          paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
          shouldResetPagination={pageReset}
          setShouldResetPagination={setPageReset}
          totalPages={totalPages}
        /> */}
      </Container>
    </>
  );
};

export default AdminDashboard;
