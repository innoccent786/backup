import { Grid, TextField, Autocomplete } from "@mui/material";
import React, { useState, useContext } from "react";
import ReactSearchBox from "react-search-box";
import { TraderContext } from "../TraderView/context";
import ProductsList from "../ProductsList";
import { InventoryProps } from "./types";
import {memo} from 'react'
// type SearchValue
interface SearchProvider {
  collectionName: string;
  contractAddress: string;
  id: string;
  image: string;
  name: string;
  tokenId: string;
  url: string;
}


const Inventory: React.FC<InventoryProps> = (props) => {
  // const { products } = props;

  const dataNft = useContext(TraderContext);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [dataForSearch, setDataForSearch] = useState(dataNft?.products);
  const [dataAfterSearch, setDataAfterSearch] = useState<
    SearchProvider[] | any
  >([]);



  const allData = dataForSearch;

console.log(dataForSearch)
  const onSearch = (valueToSearch: string) => {
    setIsSearch(true);
    const filterData = allData?.find((nft) => {
      if(nft.name == valueToSearch || nft.contractAddress == valueToSearch ||
        nft.tokenId == valueToSearch) return nft
    });
    const getDat = { ...filterData };
    setDataAfterSearch([
      {
        collectionName: getDat.collectionName,
        contractAddress: getDat.contractAddress,
        id: getDat.id,
        image: getDat.image,
        name: getDat.name,
        tokenId: getDat.tokenId,
        url: getDat.url,
      },
    ]);
  };

  const onChangeSearch = (valueToSearch: string) => {
    setSearchValue(valueToSearch);
    setIsSearch(true);
    const filterData = allData?.find((nft) => {
      if(nft.name.substring(0,valueToSearch.length).toUpperCase()== valueToSearch.toUpperCase() || nft.contractAddress.substring(0,valueToSearch.length) == valueToSearch ||
      nft.tokenId.substring(0,valueToSearch.length)== valueToSearch) return nft
    });
    const getDat = { ...filterData };
    if (filterData != undefined) {
        setDataAfterSearch([
          {
            collectionName: getDat.collectionName,
            contractAddress: getDat.contractAddress,
            id: getDat.id,
            image: getDat.image,
            name: getDat.name,
            tokenId: getDat.tokenId,
            url: getDat.url,
          },
        ])
      // );
    } else {
      setDataAfterSearch(undefined);
    }
  };

  const dataPm=[
    {
      image: '1',
    name: '1',
    url: '1',
    id: '1',
    contractAddress: '1',
    collectionName: '1',
    tokenId: '1',
    }
  ]
  console.log("inventor",dataNft?.products[0])
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          disabled={!dataNft?.isCurrentUser}
          label="Search..."
          size="small"
          value={searchValue}
          onKeyPress={(e) => e.key === "Enter" && onSearch(searchValue)}
          onChange={(e) => onChangeSearch(e.target.value)}
        />

      </Grid>
      <Grid item xs={12}>
        {searchValue == "" ? (
          <ProductsList products={dataNft?.products} id="inventory" 
          
          />
        ) : dataAfterSearch === undefined ? (
          "No Nft Found"
        ) : (
          <ProductsList
            products={
              !isSearch
                ? dataNft?.products
                : dataAfterSearch.length > 0
                ? dataAfterSearch
                : dataNft?.products
            }
            id="inventory"

          />
        )}
      </Grid>
    </Grid>
  );
};

export default memo(Inventory);
