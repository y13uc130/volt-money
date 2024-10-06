import { useCallback, useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/cookies";
import { Box, Modal } from "@mui/material";

export const LoanOffersPage = (props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 646,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const loanOffers = [
    {
      image:
        "https://www.getonecard.app/assets/offers/credexpandedheader_31.png",
      amount: "10 Lakhs",
      interestRate: "12%",
      processingFee: "4000₹",
    },
    {
      image:
        "https://assets.getonecard.app/assets/offers/Housing_Education_header_1709821092276.png",
      amount: "8 Lakhs",
      interestRate: "11%",
      processingFee: "3000₹",
    },
    {
      image:
        "https://assets.getonecard.app/assets/offers/assheader_1724939075182.png",
      amount: "20 Lakhs",
      interestRate: "15%",
      processingFee: "2000₹",
    },
  ];
  useEffect(() => {
    const userDetails = getCookie("userDetails");
    if (!userDetails) {
      navigate("/");
    }
  }, []);
  const handleLogout = useCallback(() => {
    deleteCookie();
    navigate("/");
  }, []);

  const handleGetOfferClick = useCallback((offer) => {
    setOpenModal(offer);
  }, []);
  const handleClose = () => setOpenModal(null);

  return (
    <>
      <div className="loanOffersContainer">
        <div className="headerContainer">
          <div className="loanPageHeader">Loan Offers specialised for you!</div>
          <div className="item-center" onClick={handleLogout}>
            <LogoutOutlinedIcon />
            <div className="ml-0.5 logout cursor-pointer">Logout</div>
          </div>
        </div>
        <div className="cardsContainer">
          {loanOffers.map((offer) => {
            return (
              <div key={offer.amount} className="cardContainer">
                <div className="offer-card">
                  <img src={offer.image} alt="x" className="offer-image" />
                  <div className="offer-details">
                    <div className="leftContent mb-4">
                      <span> Loan Amount</span>
                      {offer.amount}
                    </div>
                    <div className="leftContent mb-4">
                      <span> Interest Rate</span>
                      {offer.interestRate}
                    </div>
                    <div className="leftContent mb-8">
                      <span> Processing Fee</span> {offer.processingFee}
                    </div>
                    <Button
                      className="!mb-2 w-full offerBtnStyle"
                      variant="contained"
                      onClick={(e) => handleGetOfferClick(offer)}
                    >
                      Get Offer
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative">
        {openModal && openModal?.amount ? (
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="modalContent text-center">
                Congratulations! <br />
                <span>
                  You have availed a loan worth {openModal.amount} amount
                  successfully &#128512;
                </span>
              </div>
            </Box>
          </Modal>
        ) : null}
        {openModal && (
          <ConfettiExplosion zIndex={2} className="confettiStyle" />
        )}
      </div>
    </>
  );
};
