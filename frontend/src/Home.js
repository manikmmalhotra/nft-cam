import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TryInAR from "./TryInAR";
import ConnectWallet from "./ConnectWallet";
import axios from "axios";
import { useContext, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import { UserContext } from './LoginContext';
import { useNavigate } from 'react-router-dom';

const CssTextField = styled(TextField)({
  "& .MuiFilledInput-input": {
    color: "#303030",
    backgroundColor: "white",
    borderColor: "#303030",
    borderRadius: 6,
  },
});

const StyledButton = styled(Button)({
  color: "#ffd500",
  height: "55px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  backgroundColor: "#303030",
  borderColor: "#ffd500",
  border: "1px solid",
  "&:hover": {
    backgroundColor: "#a6a6a6",
  },
  "&:active": {
    backgroundColor: "#a6a6a6",
  },
});

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let [user, setUser, userInputURL, setUserInputURL] = useContext(UserContext)
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setUserInput(e.target.value);
  };

  const tryInAR = async () => {
    // Validate the user input looks like a gltf link.
    if (userInput.includes("opensea.io/assets/0x")) {
      console.log("User input URL looks good");
      let reqUrlPrefix = userInput.includes("testnets.opensea.io")
        ? "https://testnets-api.opensea.io/api/v1/asset/"
        : "https://api.opensea.io/api/v1/asset/";
      const reqUrl = reqUrlPrefix + userInput.split("/assets/")[1];
      console.log(reqUrl);
      const response = await axios.get(reqUrl);
      console.log(response);
      if (response.data.animation_url && response.data.animation_url.endsWith("gltf")) {
        setUserInputURL(response.data.animation_url);
        navigate('/arcam');
      } else {
        setErrMsg("Asset is not GLTF and cannot be displayed in AR! Please try another one.");
      }
    } else {
      setErrMsg("URL does not look like an OpenSea NFT! Please try again.");
    }
  };

  return (
    <div>
      <Typography variant="h1" align="center" color="white">
        NFT Cam
      </Typography>
      <Typography variant="h5" align="center" color="white">
        Bring your NFTs to AR in one click
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <Box
          sx={{
            width: "600px",
            marginRight: "20px",
          }}
        >
          <CssTextField
            id="nft-link-input"
            fullWidth
            label="Enter OpenSea NFT link"
            variant="filled"
            onChange={handleTextFieldChange}
          />
        </Box>
        <StyledButton variant="contained" onClick={tryInAR}>Try in AR</StyledButton>
      </Box>
      <Typography variant="body1" align="center" color="#ffd500" mt={1} mb={1}>
        {errMsg}
        </Typography>
      <Typography variant="body1" align="center" color="white" mt={1} mb={1}>
        Or
      </Typography>
      <ConnectWallet />
    </div>
  );
}
