import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import Section from "./../../components/Section";
import Breadcrumb from "./../../components/Breadcrumb";
import FlexTable from "./../../components/FlexTable";
import Modal from "./../../components/Modal";
import Button from "./../../components/Button";
import UpdateProverb from "./../proverb/UpdateProverb";
import AddProverb from "./../proverb/AddProverb";
import { userDashboardTitle } from "./../../helpers/flexTableData";
import { useAuth, useProverb } from "./../../redux/hooks";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, loading: userLoading } = useAuth();
  const {
    getUserProverbs,
    userProverbs,
    deleteProverb,
    getProverb,
    proverb,
  } = useProverb();

  //Modal States
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
  });
  //Modal Handlers
  const handleShowModal = async (type, id) => {
    const userProverb = userProverbs.find((p) => p._id === id);
    if (type === "update") {
      await getProverb(id);
      userProverb.adminApproval
        ? toast.error("You cannot update approved proverb")
        : setModal({
            isOpen: true,
            type: "update",
          });
    }
    if (type === "delete") {
      await getProverb(id);
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

  useEffect(() => {
    getUserProverbs();
  }, [getUserProverbs]);

  // Icon Click Handlers
  const handleIconClick = (e) => {
    const id = e.target?.ownerSVGElement?.id || e.target?.id;
    const icon =
      e.target?.ownerSVGElement?.textContent || e.target?.textContent;
    switch (icon) {
      case "Edit":
        handleShowModal("update", id);
        break;
      case "TrashAlt":
        handleShowModal("delete", id);
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
    if (modal.type === "update" && !proverb.adminApproval) {
      return <UpdateProverb handleCloseModal={handleCloseModal} />;
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
        title={!userLoading && `${user?.name} DASHBOARD`}
        containerClass="d-flex justify-content-between mx-5 align-items-center"
      >
        <Breadcrumb activePage="Dashboard" />
      </Section>
      <Button
        variant="info"
        text="Add Proverb"
        onClick={() => handleShowModal("add")}
        color="white"
        type="submit"
        className="button-custom float-right m-5"
        id="user-dashboard-add-proverb-button"
      />
      <Container>
        {userProverbs.length ? (
          <FlexTable
            data={userProverbs}
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
