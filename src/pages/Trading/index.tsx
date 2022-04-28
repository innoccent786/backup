/**
 * tradeDetails folgende Arrays: (Nicht eingeloggt und betrachtet Trade), (Eingeloggt und betrachtet Trade), (Eingeloggt und Creator und kein Joiner), (Eingeloggt als Creator und mit Joiner), (Eingeloggt als Joiner mit Creator)
 */
import useStyles from "./styles";
import { Icon } from '@iconify/react';
import ProductsList from "../../components/ProductsList";
import { ProductType } from "../../components/Product/types";
import {TraderProductPropsType} from './context'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import SelectedProductDataContext from "./context";
import { TraderProductProps } from "./context";
import ReactDOM from "react-dom"
import {
  Container,
  Grid,
  Paper,
  FormControlLabel,
  Typography,
  TableBody,
  TableCell,
  TextField,
  TableRow,
  Checkbox,
  Button,
  Table,
  Alert,
  Tooltip,
} from "@mui/material";
import React, { memo, useEffect, useState,useReducer } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import { ReactComponent as Ethereum } from "../../assets/svg/ethereum-eth-logo.svg";

import { Box } from "@mui/system";
import * as AOS from "aos";

import TradeConfirmation from "../../components/TradeConfirmation";
import { SendingStatus, TradeStatus, User } from "./types";
import TraderView from "../../components/TraderView";
import ChatDrawer from "../../components/ChatDrawer";

interface PersonProps {
  sendValue: string | number;
}

const Trading = () => {
  const [sendValue, setSendValue] = useState("");
  const [feeValue, setFeeValue] = useState("");

  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
    "data-aos": "fade-left",
  };

  const changeTradeStatus = (status: TradeStatus) => () =>
    onTradeStatusChange(status);

  /**
   * On enter key press
   */
  const onEnterPressAction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      alert("DO SOMETHING");
    }
  };

  // @ts-ignore
  const Moralis = window.Moralis;
  const classes = useStyles();
  /**
   * Some information:
   * trade.creator = Someone who created the trade, is never null
   * traade.joiner = Someone who joined the trade afterwards, can be null if no one joined the trade
   * trade.walletAddress = Wallet Address of the current logged in user, who is looking at this trade. Can be null if not logged in.
   *
   * if creator.user.walletAddress machtes with trade.walletAddress, then the user watching is the creator of the trade, means that user 1 would be creator and user 2 is nobody
   * if trade.walletAddress doesn't match with creator.user.walletAddress, this means someone who is logged in, is watching the trade but right now isn't participant in the trade, so he can click on Join Trade
   * if trade.walletAddress means that someone is watching the trade, who isn't logged in but he still can click on "Join Trade", in this case he will be directed from /trade to /
   * Such array can't have a joiner != null where the trade.walletAddress != joiner.walletAddress and trade.walletAddress != creator.walletAddress. This case is prevented by the backend automatically
   *
   * This "tradeDetails" array below is an example, if the user watching this trade is not logged in and this trade has no joiner
   * Trade Join button should be shown, but as he isn't logged in (because trade.walletAddress is null), he will be directed to page 1, to log in first
   * In this case "Creator" is User 2 and no one is User 1. So all fields on user 1's side should be non-editable
   */

  const tradeDetails = {
    trade: {
      tradeId: "F8SqtYd6omi", // unique ID of trade
      creator: {
        // The user who created this trade
        user: {
          walletAddress: "0x9aae148ef888806af6b0af36a0e858fcc21756fd", //the creators unique address
          nfts: [
            {
              //all nfts he has in his inventory
              tokenStandard: "ERC1155", // Standard of the NFT, there are only 2 different standards
              collection: {
                // the collection, this nft is related to.
                contractAddress: "0x90064f82dbd56baa72d29c5a96add27a2174dacd", //the nft collections unique id
                name: "TheFiveCollection", //the nft collections name
              },
              tokenId:
                "103999832376770056215171022577019068686299167504293209265729360280801480015873", // the tokenid of the nft
              name: "1155test", // name of the nft
              openseaUrl:
                "https://testnets.opensea.io/assets/0x90064f82dbd56baa72d29c5a96add27a2174dacd/103999832376770056215171022577019068686299167504293209265729360280801480015873", // url, which shows the nft on opensea
              imageUrl:
                "https://lh3.googleusercontent.com/ROC9RWmLnYYojZ_xBgoprG_lS9Rq8874p1lntt_GOwVk1C70WkeGHqfYhsAnPSN5ibA8cizbuhe80BadsEVl0jHpno68EMa2UzipVkU=s128", // image of the nft
            },
            {
              tokenStandard: "ERC721", //same thing but the next nft in the users inventory
              collection: {
                contractAddress: "0x62f0b023059ee0c755547722d1612f5532c80a67",
                name: "MOMOCO-X",
              },
              tokenId: "5",
              name: "#5",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x62f0b023059ee0c755547722d1612f5532c80a67/5",
              imageUrl:
                "https://lh3.googleusercontent.com/9PoUA-uHcTgO_RvFbLEEAJc4S4MU16v3ZqxCvolQ950pFYsFWTSSxWptH-MfcdJnJwfBKR7AQ7JeFHTa-soV4sW4uS7C8TYrk8bS1w=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0x0dc6cd447b9de3e14df06d331e278bf8afe0b0c7",
                name: "Alice Loves Sea NFT",
              },
              tokenId: "1",
              name: "ALS-1",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x0dc6cd447b9de3e14df06d331e278bf8afe0b0c7/1",
              imageUrl:
                "https://lh3.googleusercontent.com/9CTmSEBhrcsnvy8vq7ZldpjppkWZ4gbQxSS4_S8Qaq84CKyEmcSchO_hRfrLzRGDVoNz4iuVp0rCPQ9M7GZHLKMmJQzA-BhCDyKghg=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xa987e725a65a7a2786a8314bf2a1fb62f6d44899",
                name: "Spaceship-NFT",
              },
              tokenId: "467001",
              name: "SpaceShip",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xa987e725a65a7a2786a8314bf2a1fb62f6d44899/467001",
              imageUrl:
                "https://lh3.googleusercontent.com/xBzWGpiJSnVMfUFqtjgNibVTwyYHMxYGNM_7PYPv0RBTWUEzBxgtiCGHmOwsL1iHKNQ9lBp8DDQijEY-Sw7xn0Wh_RJpkUktFN3e=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0x8664f3645ba4cc5a09c47b2b1dfb0f152798eb38",
                name: "CyberBrokers",
              },
              tokenId: "52",
              name: "Griffin of Shining",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x8664f3645ba4cc5a09c47b2b1dfb0f152798eb38/52",
              imageUrl:
                "https://storage.opensea.io/files/569aead605b106fc26d6ae0723e4f572.svg",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0x517e5f5378f11c6da27e960c2bf9dfc552c7375c",
                name: "OpenSky BAYC",
              },
              tokenId: "39",
              name: null,
              openseaUrl:
                "https://testnets.opensea.io/assets/0x517e5f5378f11c6da27e960c2bf9dfc552c7375c/39",
              imageUrl:
                "https://lh3.googleusercontent.com/FuZ0NR1yh1jZWumbeCeNiPDFL1YE58nxIj0HzQN9_cgGfvmdIAHCNM5wc_Yo0FKg7qHaRbAfanIQAJ16Ez8997Y_AOomTSxERm14=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0x84422f9d721708d498a410dd3da18856bdb41021",
                name: "Doge-1 OGs",
              },
              tokenId: "94",
              name: "DOGE-1 OGs Collection",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x84422f9d721708d498a410dd3da18856bdb41021/94",
              imageUrl:
                "https://lh3.googleusercontent.com/iojmc7WJ0Sy90IigcZBNGw7rYtZ96pPcCGkDnCqv37-TbAJVBiciVhVHbnWe2gKE9i_ILMvC3T15V4QEdBtCud0yho5-vxGmioNrVis=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xc0d91b3950bc15e29991a1dedd46c552799d3262",
                name: "Jessy Prueba 5",
              },
              tokenId: "7",
              name: "Dastardly Duck #0007",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xc0d91b3950bc15e29991a1dedd46c552799d3262/7",
              imageUrl:
                "https://lh3.googleusercontent.com/cYwdR39L9HiAxunJ3iBIVwgClZNo2cJHvObjyvHj9fS1T7K7hA15eVA9C8bHuTv7Tvvqm0XGhxIuQiHeJ3ODVXg1Ci74-TaOMD0KXw=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b",
                name: "MultiFaucet NFT",
              },
              tokenId: "89200",
              name: "MultiFaucet Test NFT",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b/89200",
              imageUrl:
                "https://lh3.googleusercontent.com/jDFIJBe7q7oE208GMI0gRWX8sNhw2apWX9vdsG_fBwVxy1A9nuA09azjOpFL1LRUFlN53tmkObnyjNyhcF1yTd02JOJh7hIpfrS_=s128",
            },
          ],
        },
        nftsInTrade: [
          {
            // the nfts the user has in the trading inventory / basked: The nfts the user wants to trade
            nft: {
              // same as above
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0x517e5f5378f11c6da27e960c2bf9dfc552c7375c",
                name: "OpenSky BAYC",
              },
              tokenId: "39",
              name: null,
              openseaUrl:
                "https://testnets.opensea.io/assets/0x517e5f5378f11c6da27e960c2bf9dfc552c7375c/39",
              imageUrl:
                "https://lh3.googleusercontent.com/FuZ0NR1yh1jZWumbeCeNiPDFL1YE58nxIj0HzQN9_cgGfvmdIAHCNM5wc_Yo0FKg7qHaRbAfanIQAJ16Ez8997Y_AOomTSxERm14=s128",
            },
            fees: 0.0, // the fees, which the users pays for this specific nft only
            tokenFees: "BASE", // Fee type. Not important for you
          },
          {
            nft: {
              tokenStandard: "ERC1155",
              collection: {
                contractAddress: "0x90064f82dbd56baa72d29c5a96add27a2174dacd",
                name: "TheFiveCollection",
              },
              tokenId:
                "103999832376770056215171022577019068686299167504293209265729360280801480015873",
              name: "1155test",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x90064f82dbd56baa72d29c5a96add27a2174dacd/103999832376770056215171022577019068686299167504293209265729360280801480015873",
              imageUrl:
                "https://lh3.googleusercontent.com/ROC9RWmLnYYojZ_xBgoprG_lS9Rq8874p1lntt_GOwVk1C70WkeGHqfYhsAnPSN5ibA8cizbuhe80BadsEVl0jHpno68EMa2UzipVkU=s128",
            },
            fees: 0.0,
            tokenFees: "BASE",
          },
        ],
        nftsValue: 0.0, // the value of all nfts combined together
        ethToTrade: {
          // how much etherum the user want to send to the other user
          etherValue: 2.0,
        },
        accepted: false, // if this user has accepted the trade of not. If both accept the Trading window will open
        fees: 0.07, // the calculated fees of the user he has to pay
      },
      joiner: {
        // the user who joined this trade. Can be null which means, no one joined the trade yet.
        user: {
          walletAddress: "0xb6b3072c671d7d92cb2c38ae29e4286b2ffb001f",
          nfts: [
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xb74bf94049d2c01f8805b8b15db0909168cabf46",
                name: "Azuki God",
              },
              tokenId: "31",
              name: "Azuki #31",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xb74bf94049d2c01f8805b8b15db0909168cabf46/31",
              imageUrl:
                "https://lh3.googleusercontent.com/zI7zvi0dFwfEVLX1O0Vbqvl-Kr7uOJqNwY16B0pbeHGcSAC0fnSoRgWRWHwlv4PMzyvKzJwgc4E40mGXTUX8WYJr9zztBqO1hXxe-Q=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xefdc2c6ccbae323dbc5dfcf4806b636ec2dc3c9f",
                name: "Multi Chicks",
              },
              tokenId: "5",
              name: "Multi Chick #5",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xefdc2c6ccbae323dbc5dfcf4806b636ec2dc3c9f/5",
              imageUrl:
                "https://lh3.googleusercontent.com/rDXV4qkY9THuYAd5rEZF4yI_EuwgsZEB7pqJ24zuX3z_8BQW2PVI6_kIILAMApDjl0kF532qsr_aHJpmCKhQhO-O_6QXk-XpP8XPo6g=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xe56b3356d27b41e7d3817ef8df14d768288314e9",
                name: "Laser eye NFT",
              },
              tokenId: "39",
              name: "Dave Starbelly",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xe56b3356d27b41e7d3817ef8df14d768288314e9/39",
              imageUrl:
                "https://lh3.googleusercontent.com/WVVyX_7-2pbKgtiLGeWjLmhntT2d3Eh0Z1p6N3MhqcEAz3cwOOe-XPUoq30_WCYR1oCF4_GsJ1xAqRM5ujxafr_pfg=s128",
            },
            {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0x6d1e2ab474afc81a33805010ae52ca25325d1792",
                name: "Crypto Bean",
              },
              tokenId: "4",
              name: "Crypto Bean #4",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x6d1e2ab474afc81a33805010ae52ca25325d1792/4",
              imageUrl:
                "https://lh3.googleusercontent.com/9nGEtV7HT0J4QuCRF5QsmaVpKZL3ialG-08ruPnhJDkGMDh5B42RyX7jf2a1GG1joOD7pqQv9PUDRsvDxedsXLkayppUv8BPlshrWg=s128",
            },
            {
              tokenStandard: "ERC1155",
              collection: {
                contractAddress: "0x7962d8ee35fcbe47ec8e24242f818ad99111ac2a",
                name: "FuniquePass",
              },
              tokenId: "3",
              name: "FuniquePass TypeC",
              openseaUrl:
                "https://testnets.opensea.io/assets/0x7962d8ee35fcbe47ec8e24242f818ad99111ac2a/3",
              imageUrl:
                "https://lh3.googleusercontent.com/VgEZeCTLfPAXHZRKePqXM9QwIgv_Zuyz17FI8oU62BLmKZP12hO5Q2y0FbTmsOv09OiodbzZQIqFaxAvUj_Ad8ud6E7to5IBZrfFng=s128",
            },
          ],
        },
        nftsInTrade: [
          {
            nft: {
              tokenStandard: "ERC721",
              collection: {
                contractAddress: "0xefdc2c6ccbae323dbc5dfcf4806b636ec2dc3c9f",
                name: "Multi Chicks",
              },
              tokenId: "5",
              name: "Multi Chick #5",
              openseaUrl:
                "https://testnets.opensea.io/assets/0xefdc2c6ccbae323dbc5dfcf4806b636ec2dc3c9f/5",
              imageUrl:
                "https://lh3.googleusercontent.com/rDXV4qkY9THuYAd5rEZF4yI_EuwgsZEB7pqJ24zuX3z_8BQW2PVI6_kIILAMApDjl0kF532qsr_aHJpmCKhQhO-O_6QXk-XpP8XPo6g=s128",
            },
            fees: 0.0,
            tokenFees: "BASE",
          },
        ],
        nftsValue: 0.0,
        ethToTrade: { etherValue: 0.0 },
        accepted: false,
        fees: 0.015,
      },
      state: "OPEN", // the status of the trade
      chat: {
        littleMessages: [], // messages in the chat, but only the 20 newest to reduce lags
      },
      bot: null, // a bot, not relevant for you
    },
    walletAddress: "0xb6b3072c671d7d92cb2c38ae29e4286b2ffb001f", // the unique address of the user, who is watching the trade. If this equals to creator walletAddress, then the viewer is creator. If this equals joiner wallet address, then viewer is joiner. If Joiner is null and this address doesn't match creator address, then user watching is not trade participant but can join with "join Trade" button.
  };

  // @ts-ignore
  //const tradeDetails = data;

  const myWalletAddress = tradeDetails.walletAddress;
  let myPart = null;
  let otherPart = null;

  if (
    myWalletAddress != null &&
    tradeDetails.trade.creator.user.walletAddress === myWalletAddress
  ) {
    myPart = tradeDetails.trade.creator;
    otherPart = tradeDetails.trade.joiner;
    // @ts-ignore
  } else if (
    myWalletAddress != null &&
    tradeDetails.trade.joiner != null &&
    tradeDetails.trade.joiner.user.walletAddress === myWalletAddress
  ) {
    myPart = tradeDetails.trade.joiner;
    otherPart = tradeDetails.trade.creator;
  } else {
    otherPart = tradeDetails.trade.creator;
  }

  let myName = null;
  let myAcceptance = null;
  let iWillPayOtherFees = null;
  let myAllNfts = [];
  // @ts-ignore
  let myNftsToTrade = [];
  let myNftsValue = null;
  // @ts-ignore
  let myEthToTrade = null;
  // @ts-ignore
  let myFees = null;

  let otherName = null;
  let otherAcceptance = null;
  let otherWillPayOtherFees = null;
  let otherAllNfts = [];
  let otherNftsToTrade = [];
  let otherNftsValue = null;
  let otherEthToTrade = null;
  let otherFees = null;

  let tradeState = tradeDetails.trade.state;

  if (myPart != null) {
    myName = myPart.user.walletAddress;
    myAcceptance = myPart.accepted ? TradeStatus.ACCEPTED : TradeStatus.NONE;
    // @ts-ignore
    iWillPayOtherFees = myPart.payAllFees;
    myNftsValue = myPart.nftsValue;
    myEthToTrade = myPart.ethToTrade.etherValue;
    // @ts-ignore
    myFees = myPart.fees;

    for (const token of myPart.nftsInTrade) {
      const nft = token.nft;
      myNftsToTrade.push({
        // @ts-ignore
        id: nft.collection.contractAddress + ":" + nft.tokenId,
        // @ts-ignore
        name: nft.name != null ? nft.name : "#" + nft.tokenId,
        // @ts-ignore
        contractAddress: nft.collection.contractAddress,
        // @ts-ignore
        tokenId: nft.tokenId,
        // @ts-ignore
        collectionName: nft.collection.name,
        // @ts-ignore
        image: nft.imageUrl,
        // @ts-ignore
        url: nft.openseaUrl,
      });
    }

    for (const nft of myPart.user.nfts) {
      if (
        myNftsToTrade.filter(
          (oNft) =>
            oNft.id === nft.tokenId &&
            oNft.contractAddress === nft.collection.contractAddress
        ).length > 0
      )
        continue;

      myAllNfts.push({
        // @ts-ignore
        id: nft.collection.contractAddress + ":" + nft.tokenId,
        // @ts-ignore
        name: nft.name != null ? nft.name : "#" + nft.tokenId,
        // @ts-ignore
        contractAddress: nft.collection.contractAddress,
        // @ts-ignore
        tokenId: nft.tokenId,
        // @ts-ignore
        collectionName: nft.collection.name,
        // @ts-ignore
        image: nft.imageUrl,
        // @ts-ignore
        url: nft.openseaUrl,
      });
    }
  } else {
    myName = "";
    iWillPayOtherFees = false;
    myAcceptance = TradeStatus.NONE;
    myNftsValue = 0;
    myEthToTrade = 0;
    myFees = 0;
  }

  if (otherPart != null) {
    otherName = otherPart.user.walletAddress;
    otherAcceptance = otherPart.accepted
      ? TradeStatus.ACCEPTED
      : TradeStatus.NONE;
    // @ts-ignore
    otherWillPayOtherFees = otherPart.payAllFees;
    otherNftsValue = otherPart.nftsValue;
    otherEthToTrade = otherPart.ethToTrade.etherValue;
    // @ts-ignore
    otherFees = otherPart.fees;

    for (const token of otherPart.nftsInTrade) {
      const nft = token.nft;
      otherNftsToTrade.push({
        // @ts-ignore
        id: nft.collection.contractAddress + ":" + nft.tokenId,
        // @ts-ignore
        name: nft.name != null ? nft.name : "#" + nft.tokenId,
        // @ts-ignore
        contractAddress: nft.collection.contractAddress,
        // @ts-ignore
        tokenId: nft.tokenId,
        // @ts-ignore
        collectionName: nft.collection.name,
        // @ts-ignore
        image: nft.imageUrl,
        // @ts-ignore
        url: nft.openseaUrl,
      });
    }

    for (const nft of otherPart.user.nfts) {
      if (
        otherNftsToTrade.filter(
          (oNft) =>
            oNft.id === nft.tokenId &&
            oNft.contractAddress === nft.collection.contractAddress
        ).length > 0
      )
        continue;

      otherAllNfts.push({
        // @ts-ignore
        id: nft.collection.contractAddress + ":" + nft.tokenId,
        // @ts-ignore
        name: nft.name != null ? nft.name : "#" + nft.tokenId,
        // @ts-ignore
        contractAddress: nft.collection.contractAddress,
        // @ts-ignore
        tokenId: nft.tokenId,
        // @ts-ignore
        collectionName: nft.collection.name,
        // @ts-ignore
        image: nft.imageUrl,
        // @ts-ignore
        url: nft.openseaUrl,
      });
    }
  } else {
    otherName = "No one joined the trade yet";
    otherWillPayOtherFees = false;
    otherAcceptance = TradeStatus.NONE;
    otherNftsValue = 0;
    otherEthToTrade = 0;
    otherFees = 0;
  }
  
  const [selectProductChange,changeProduct]=useState(myNftsToTrade);

  const users: { [id: string]: User } = {
    user1: {
      name: myName,
      id: "user1",
      trade: {
        tradeStatus: myAcceptance,
       // tradeStatus:TradeStatus.ACCEPTED,
        payOtherTraderFees: iWillPayOtherFees,
        // @ts-ignore
        selectedProducts: selectProductChange,
        tradeId: "",
        price: myEthToTrade,
        confirmation: {
          sendingMoneyStatus: SendingStatus.NONE,
          sendingItemsStatus: SendingStatus.NONE,
        },
      },
      // @ts-ignore
      products: myAllNfts,
    },
    user2: {
      name: otherName,
      id: "user2",
      trade: {
        tradeStatus: otherAcceptance,
        //tradeStatus:TradeStatus.ACCEPTED,
        
        payOtherTraderFees: otherWillPayOtherFees,
        // @ts-ignore
        selectedProducts: otherNftsToTrade,
        tradeId: "",
        price: otherEthToTrade,
        confirmation: {
          sendingMoneyStatus: SendingStatus.NONE,
          sendingItemsStatus: SendingStatus.NONE,
        },
      },
      // @ts-ignore
      products: otherAllNfts,
    },
  };

  const [tradesDetails, updateTrades] = useState<typeof users>(users);
  const [userId, setUserId] = useState<string>(users.user1.id);
  const dealClosed = Object.values(tradesDetails).every(
    ({ trade }) => trade.tradeStatus === TradeStatus.ACCEPTED
  );
  const { enqueueSnackbar } = useSnackbar();
  const setSelectProductChange=(val:TraderProductProps)=>{
    //console.log(val)
//  alert(val)
    const {...uprodcut}=tradesDetails;
    let flag=false;
    for(var i=0;i<selectProductChange.length;i++){
      if(selectProductChange[i].id===val.id)
      {flag=true;
      break;
      }
    }
    if(flag===false){
    selectProductChange.push(val);
   //alert(selectProductChange.length)
    uprodcut[userId].trade.selectedProducts=selectProductChange
   // myNftsToTrade.push(val)
    updateTrades(uprodcut)
    }
  }
  /**
   *
   * ### Main Methods ###
   *
   */

  /**
   * Checks if user can join trade
   */
  // todo if method returns true, "Join Trade" Button should be visible
  const canJoinTrade = () => {
    //leave this to me
    return true;
  };

  /**
   * When user joins trade
   */
  const onJoinTrade = () => {
    if (tradeDetails.walletAddress == null) {
      const msg = "Login first to join the trade";
      window.location.href = "/?error=" + encodeURI(msg);
      return;
    }

    post("/join", [], function (response: string) {
      if (response === "SUCCESS") {
        window.location.reload();
      } else {
        enqueueSnackbar(response, {
          variant: "error",
        });
      }
    });
  };

  /**
   * On product select or deselect
   */
  //todo only user 1 can move product. If opposite trader (user 2) moves product, the websocket will update the trade (websocket it at below, at the end of the methods)
  // so we don't need --> userId: string as parameter. The parameter can be removed
  // there is also a bug: if someone moves a nft, there will be a post call. And as the postcall does take some time, the nft gets resetted back to its original position and then brought back here if backend responds "SUCCESS"
  const onProductMove = (userId: string) => (data: DropResult) => {
    const { ...details } = tradesDetails;
    const isSameDroppableId =
      data.source.droppableId === data.destination?.droppableId;

    if (isSameDroppableId) return;

    // Add NFT
    if (data.destination?.droppableId === "selected") {
      const nft = details[userId].products[data.source.index];

      post(
        "/addNft",
        {
          // @ts-ignore
          contractAddress: nft.contractAddress,
          // @ts-ignore
          tokenId: nft.tokenId,
        },
        function (response: string) {
          if (response === "SUCCESS") {
            details[userId].trade.selectedProducts.push(nft);
            
            delete details[userId].products[data.source.index];
            updateTrades(details);
          } else {
            enqueueSnackbar(response, {
              variant: "error",
            });
          }
        }
      );
    }

    // Remove NFT
    if (
      data.source?.droppableId === "selected" &&
      data.destination?.droppableId === "inventory"
    ) {
      const nft = details[userId].trade.selectedProducts[data.source.index];

      post(
        "/removeNft",
        {
          // @ts-ignore
          contractAddress: nft.contractAddress,
          // @ts-ignore
          tokenId: nft.tokenId,
        },
        function (response: string) {
          if (response === "SUCCESS") {
            details[userId].products.push(nft);
            delete details[userId].trade.selectedProducts[data.source.index];
            updateTrades(details);
          } else {
            enqueueSnackbar(response, {
              variant: "error",
            });
          }
        }
      );
    }
  };

  /*
on double click
  */

  /**
   * This method is called, when user presses enter on the "Directly Add NFT" textfield or leaves the textfield
   */
  //todo the user can enter something like this: 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/1001     pay attention to the "/"
  //                                                                                       ^
  const onDirectlyAddNft = (userInput: string) => {
    let nftDetails = userInput.split("/");
    const contractAddress = nftDetails[0];
    const tokenId = nftDetails[1];

    post(
      "/addExternalNft",
      {
        // @ts-ignore
        contractAddress: contractAddress,
        tokenId: tokenId,
      },
      function (response: string) {
        if (response !== "SUCCESS") {
          enqueueSnackbar(response, {
            variant: "error",
          });
        }
      }
    );
  };

  /**
   * This methods sets the value text field
   */
  //todo implement this method please. Here userId is neccessary and should stay.
  const setValueOfNfts = (userId: string, value: string) => {
    // for example sets the text field "value" to 0.12345 ETH for a specific user
  };

  /**
   * Check pay fees for other trader
   */
  const onCheckPayFees =
    (userId: string) => (data: React.ChangeEvent<HTMLInputElement>) => {
      const { ...details } = tradesDetails;
      details[userId].trade.payOtherTraderFees = data.target.checked;
      updateTrades(details);

      post(
        "/payFees",
        {
          // @ts-ignore
          payFees: data.target.checked,
        },
        function (response: string) {
          if (response !== "SUCCESS") {
            enqueueSnackbar(response, {
              variant: "error",
            });
          }
        }
      );
    };

  /**
   * Called when user changes ETH value
   */
  // todo this method should be called only, when trader leaves the textfield or presses enter, not everytime he changes a value
  const onPriceChange = (userId: string) => {
    console.log("userId", userId);
    console.log("This is user type value", sendValue);
    const { ...details } = tradesDetails;
    const value = Number(userId);
    details[userId].trade.price = value;
    updateTrades(details);
    post(
      "/changeEth",
      {
        // @ts-ignore
        eth: value,
      },
      function (response: string) {
        if (response !== "SUCCESS") {
          enqueueSnackbar(response, {
            variant: "error",
          });
        }
      }
    );
  };

  /**
   * Clicking on Accept / Cancel Trade
   */
  const onTradeStatusChange =
    (userId: string) => async (status: TradeStatus) => {
      const { ...details } = tradesDetails;

      //todo hier ein info popup rein, wenn ich creator bin und kein joiner da ist, dass man dann sozusagen die NFTs verschenkt

      let signature = null;
      let message = null;
      if (status === "accepted") {
        const ethers = window.ethers;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        message =
          "I accept the terms and conditions of NFT Buddy. NFT Buddy is not responsible for accuracy on values, I did my own research. My Trade is: " +
          tradeDetails.trade.tradeId;
        signature = await signer.signMessage(message);
      }

      post(
        "/acceptTrade",
        {
          // @ts-ignore
          accept: status === "accepted",
          signature: signature,
          message: message,
        },
        function (response: string) {
          if (response === "SUCCESS") {
            details[userId].trade.tradeStatus = status;
            updateTrades(details);
          } else {
            enqueueSnackbar(response, {
              variant: "error",
            });
          }
        }
      );
    };

  /**
   *
   *  ### Now follows the part of the Trading Popup ###
   *
   */

  /**
   * Change confirmation status
   */
  const changeConfirmationStatus = (
    type: "money" | "items",
    userId: string,
    status: SendingStatus
  ) => {
    const { ...details } = tradesDetails;

    if (type === "money") {
      details[userId].trade.confirmation.sendingMoneyStatus = status;
      updateTrades(details);
    }

    if (type === "items") {
      details[userId].trade.confirmation.sendingItemsStatus = status;
      updateTrades(details);
    }
  };

  /**
   * On send ETH
   */
  const onSendMoney = (userId: string) => async () => {
    Moralis.start();
    await Moralis.enableWeb3({ provider: "metamask" });
    // @ts-ignore
    const fullEth = myEthToTrade + myFees;

    const tx = {
      type: "native",
      // @ts-ignore
      amount: Moralis.Units.ETH(fullEth),
      // @ts-ignore
      receiver: tradeDetails.trade.bot.walletAddress,
    };
    let result = await Moralis.transfer(tx);
    if (result.hash == null) {
      enqueueSnackbar(result.error, {
        variant: "error",
      });
      return;
    }

    post(
      "/txHash",
      {
        // @ts-ignore
        txHash: result.hash,
        eth: fullEth,
      },
      function (response: string) {
        if (response !== "SUCCESS") {
          enqueueSnackbar(response, {
            variant: "error",
          });
        }
      }
    );
  };

  /**
   * On send items
   */
  const onSendItems = (userId: string) => async () => {
    Moralis.start();
    await Moralis.enableWeb3({ provider: "metamask" });

    // @ts-ignore
    for (let i = 0; i < myNftsToTrade.length; i++) {
      // @ts-ignore
      const nft = myNftsToTrade[i];
      const options = {
        type: "erc721",
        // @ts-ignore
        receiver: tradeDetails.trade.bot.walletAddress,
        // @ts-ignore
        contractAddress: nft.contractAddress,
        // @ts-ignore
        tokenId: nft.tokenId,
      };
      let transaction = await Moralis.transfer(options);
      if (transaction.hash == null) {
        enqueueSnackbar(transaction.error, {
          variant: "error",
        });
        return;
      }

      post(
        "/txHash",
        {
          // @ts-ignore
          txHash: transaction.hash,
          contractAddress: nft.contractAddress,
          tokenId: nft.tokenId,
        },
        function (response: string) {
          if (response !== "SUCCESS") {
            enqueueSnackbar(response, {
              variant: "error",
            });
          }
        }
      );
    }
  };

  /**
   * Show notifications
   */
  useEffect(() => {
    /*enqueueSnackbar("Trade confirmed", {
                 variant: "success",
             });
             enqueueSnackbar("Trade not confirmed", {
                 variant: "warning",
             });
             enqueueSnackbar("Unexpected error", {
                 variant: "error",
             });*/
  }, [enqueueSnackbar]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    
  }, []);
  const post = (path: string, params: string[], callback: Function) => {
    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement("form");
    path = window.location.href + path;
    form.method = "post";
    form.action = path;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", path);
    xhr.onload = function (event) {
      // @ts-ignore
      callback(event.target.response);
    };

    var formData = new FormData(form);
    xhr.send(formData);
  };

  return (
    <SelectedProductDataContext.Provider
      value={{selectProductChange,setSelectProductChange}}
    >
      {/* setSelectProductChange */}
      <Box pt={5} pb={15}>
        <Container maxWidth="xl">
          <Grid container spacing={3} >
            {/* Traders */}
            {Object.values(tradesDetails).map((user) => (
              <Grid item lg={6} key={user.id}>
                <Paper sx={{ p: 3 }}>
                  <TraderView
                    userName={`${user.name}${
                      user.id === userId ? " (You)" : ""
                    }`}
                    canDragProducts={!dealClosed && user.id === userId}
                    products={tradesDetails[user.id].products}
                    trade={tradesDetails[user.id].trade}
                    isCurrentUser={user.id === userId}
                    dealClosed={dealClosed}
                    traderId={user.id}
                    // imageUrl={tradeDetails.trade.creator}
                    canJoinTrade={canJoinTrade()}
                    onTradeStatusChange={onTradeStatusChange(user.id)}
                    onCheckPayFees={onCheckPayFees(user.id)}
                    onProductMove={onProductMove(user.id)}
                    // onPriceChange={()=> onPriceChange(user.id,_)}
                    onJoinTrade={onJoinTrade}
                  />
                  <br />
                  <br />
                  <br />
                  <Grid container spacing={3}>
                    {/* Some text */}
                    {user.id===userId?
                    <Grid item xs={8} {...animation}>
                      <Tooltip title="User Name 1">
                        <TextField
                        variant="standard"
                          placeholder="ContractAddress/TokenId"
                          onKeyPress={onEnterPressAction}
                          disabled={user.id !== userId}
                          label="Directly add NFT"
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <SearchIcon fontSize="small"/>
                            ),
                            style:{color:"#525252"}
                          }}
                        />
                      </Tooltip>
                    </Grid>
                 :<Grid item xs={12}><br/><br/></Grid>}   
                    {/* Value */}
                    <Grid item xs={6} {...animation}>
                      <Tooltip title="User Name 2">
                      <Box>
        <span style={{color:"#525252",fontWeight:"bold"}}>Value</span>
                
                         <Box sx={{ display: 'flex' }}>
            &nbsp;&nbsp;&nbsp;    <Icon icon="mdi:ethereum" color="#776ad2" style={{width:25, height:25}}/>
            <Typography variant="h6" alignSelf="center" fontSize="20px" fontWeight="bold" color="#68C552" component="p">
            {user.id === userId ? "0.05" : "0.06"}
          </Typography> 
                            </Box>
                        </Box>
                
                      </Tooltip>
                    </Grid>
                    {user.id==userId?
                    <Grid item xs="auto" {...animation}>
                                {/* <Typography fontWeight="bold">1</Typography> */}
                                <Box>
        <span style={{color:"#525252",fontWeight:"bold"}}>Fees</span>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
       <Typography fontSize="14px" style={{color:"#525252"}}>Unrefundable&nbsp;&nbsp;&nbsp;</Typography>

        <TextField
                                  variant="standard"
                                  disabled={true}
                                  
                                  // value={user.id !== userId ? "": feeValue}
                                  value={user.id === userId ? 0.0123 : 0.1415}
                                  onKeyPress={(e) =>
                                    e.key === "Enter" && onPriceChange(user.id)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <Icon icon="mdi:ethereum" color="#776ad2" style={{width:25, height:25}}/>
                                     
                                    ),
                                    disableUnderline:true,
                                    style:{fontSize:"14px"}
                                  }}
                                  onChange={(e) => setFeeValue(e.target.value)}
                                  className={classes.feeInput}
                                  // disabled={user.id !== userId}
                                  type="number"
                                  
                                  fullWidth
                                  // value=
                                />
                        </Box>
                        </Box>
                              
                       </Grid>
                   :""}
                    {/* Send money */}

                    <Grid item xs={12} {...animation}>
                      <Tooltip title="User Name 3">
                        <Box>
                        {
                        user.id===userId? <span style={{color:"#525252",fontWeight:"bold"}}>Send Additional Ethereum</span>
                        :<span style={{color:"#525252",fontWeight:"bold"}}>Additional Ethereum</span>}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Icon icon="mdi:ethereum" color="#776ad2" style={{width:25, height:25}}/>
                                     

                        <TextField
                         variant="standard"
                         placeholder="0" 
                         value={user.id !== userId ? "" : sendValue}
                          onKeyPress={(e) =>
                            e.key === "Enter" && onPriceChange(user.id)
                          }
                          onChange={(e) => setSendValue(e.target.value)}
                          
                          disabled={user.id !== userId}
                          type="number"
                          size="small"
                          // value=
                        />
                        </Box>
                        </Box>
                      </Tooltip>
                    </Grid>

                    {/* Pay fees */}
                    <Grid item xs={12} {...animation}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={trade.payOtherTraderFees}
                            disabled={user.id !== userId}
                            onChange={onCheckPayFees(user.id)}
                          />
                        }
                        label="Pay fees of other trader too"
                      />
                    </Grid>
                    {/* Pay fees */}
                    {/* Trade buttons */}
                    {!(
                      user.id !== userId &&
                      tradesDetails[user.id].trade.tradeStatus ===
                        TradeStatus.ACCEPTED
                    ) && (
                      <Grid item xs={12} {...animation}>
                        <Grid container columnSpacing={2}>
                          <Grid item xs={6}>
           <Button
                              disabled={
                                user.id !== userId ||
                                tradesDetails[user.id].trade.tradeStatus ===
                                  TradeStatus.ACCEPTED ||
                                dealClosed
                              }
                              size="large"
                              sx={{backgroundColor:"#37b918",fontWeight:"bold",color:"white",fontSize:"20px",padding:"1px 12px",borderRadius:"22px",fontFamily:"Verdana,sans-serif",textTransform:"capitalize"}}
                              startIcon={
                                <Icon icon="mdi:check-bold" width={24} height={24} />
                               
                              }
                              onClick={changeTradeStatus(TradeStatus.ACCEPTED)}
                              variant="contained"                              
                            >
                             {user.id===userId?"Accept":" Accepted"}
                            </Button>

                          </Grid>
                          {user.id===userId?
                          <Grid item xs={6}>
                            <Button
                              disabled={
                                user.id !== userId ||
                                tradesDetails[user.id].trade.tradeStatus !==
                                  TradeStatus.ACCEPTED ||
                                dealClosed
                              }
                              onClick={changeTradeStatus(TradeStatus.NONE)}
                              variant="contained"
                              color="error"
                              size="large"
                              startIcon={
                                <Icon icon="ep:close-bold" width={24} height={24}/>
                              }
                              sx={{borderRadius:"22px",fontSize:"20px",backgroundColor:"#B14843",fontWeight:"bold",color:"white",fontFamily:"Verdana,sans-serif",textTransform:"capitalize",padding:"1px 12px"}}
                            >
                             Cancel
                            </Button>
                          </Grid>
:""}
                        </Grid>
                      </Grid>
                    )}
                    {/* Trade accepted message */}
                    {user.id !== userId &&
                      tradesDetails[user.id].trade.tradeStatus ===
                        TradeStatus.ACCEPTED && (
                        <Grid item xs={12}>
                          <Alert severity="info">
                            <Typography variant="body1">
                              {user.name} has accepted the trade
                            </Typography>
                          </Alert>
                        </Grid>
                      )}
                    {/* Disclamer */}
                    <Grid item xs={12} {...animation}>
                      <Typography>
                        By accepting the trade, I accept the terms and
                        conditions of NFT Buddy.
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Trade confirmation */}
        <TradeConfirmation
          userId={userId}
          tradesDetails={tradesDetails}
          onSendMoney={onSendMoney}
          onSendItems={onSendItems}
          open={dealClosed}
        />

        {/* Chat dialog */}
        <ChatDrawer currentUser={tradesDetails[userId]} />
      </Box>
    </SelectedProductDataContext.Provider>
  );
};
export default memo(Trading);
