import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import { SelectButton } from "./SelectButton";
import {
  convertNumberToPersian,
  formatNumber,
  useWindowSize,
} from "../lib/utils";
import { Donation } from "../types";
import { DonationList } from "./DonationList";
import { BASE_PATH } from "../lib/constants";

const BTC_ADDRESS = "bc1q0e0s5my3cwv26k265hcfef28zk7sxd78vu3cdr";
const ETH_ADDRESS = "0x9E14bC58582792aC40E8dac45000f16A270486D8";

export const DonationView = () => {
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "donation" });
  const [donations, setDonations] = useState<Donation[]>([]);
  const [sortBy, setSortBy] = useState<"amount" | "date">("amount");
  const [crPaymentShow, setCRPaymentShow] = useState(false);
  const _ = useWindowSize();
  const totalAmount = donations.reduce((pv, cv) => pv + cv.amount, 0);
  const sortedDonations =
    sortBy === "amount"
      ? donations.sort((a, b) => (a.amount < b.amount ? 1 : -1))
      : donations.sort((a, b) => (a.date > b.date ? 1 : -1));

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch(`${BASE_PATH}/donations.json`);
      setDonations(await response.json());
    };
    fetchDonations();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontSize: "0.8rem",
        width: "100%",
      }}
    >
      <p>{t("payment_title")}</p>
      <p style={{ marginTop: 0 }}>
        <Button
          color="primary"
          variant="outlined"
          href="https://www.payping.ir/d/zfLz"
          sx={{ borderRadius: "25px" }}
        >
          {t("toman_payment")}
        </Button>{" "}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCRPaymentShow(!crPaymentShow)}
          sx={{ borderRadius: "25px" }}
        >
          BTC/ETH donation
        </Button>
      </p>
      <Box
        id="btc-address"
        sx={{ display: crPaymentShow ? "block" : "none", mb: 3 }}
      >
        <Box>
          <div>
            <b>Bitcoin</b>
          </div>
          <div>
            <a href="bitcoin:bc1q0e0s5my3cwv26k265hcfef28zk7sxd78vu3cdr">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAACRCAYAAADD2FojAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADjUlEQVR4nO3dSW7FNhBF0TjI/rfsjAIEGnyGvixJDs4ZfzUwHsoFNuLX9/f39x8Q/Pn0C/D7CRGZEJEJEZkQkQkRmRCRCRGZEJEJEZkQkQkRmRCR/fXTC7++vk6+x9J1scH1+avFCLvvu7u4YXX/0/c7rSzmUInIhIhMiMh+3BNdnV4gudtjnO5JTqvvd/ffd4dKRCZEZEJEdqwnupoel1ldv3r+3T3X7rjWyt1/309UIjIhIhMisrGe6GnT40Kn5/KeHscqVCIyISITIrL/TU+06jFqD/L0+qI3U4nIhIhMiMjGeqK7/+fv9kCne6jaM033aJNUIjIhIhMismM90d37pJ6ee5oel1o9701UIjIhIhMish/3RG8ap/gvTo8bnX7+1W/6+6pEZEJEJkRkY98nqvu2Vj3E6Z6lzl3t9lR3jzNdnby/SkQmRGRCRDY2TnR3j7J7fe0JpseVTveUq98XKhGZEJEJEdnXT0+jPj3uc/p7O6d7iN3rT7/fypP73FQiMiEiEyKyY+NEd88NTa/vedsa6dPfjNy9/hOViEyIyISI7Nh6ored7TE9DrT6/e79r57eV7dDJSITIjIhIhvbiz89N7b7++n1T6v7Te9je5JKRCZEZEJENjZ3dvr66bm12jOdnotbzUWunO7BPlGJyISITIjIxtZYX919Ptj0muO7953tvs/p+3+iEpEJEZkQkd02TnT3OfWr61fPP71+5+4zaa+ME/FqQkQmRGTHxomm946/vWe6+3y1N50xqxKRCRGZEJE9dt7Z6b38u07vvX/6e0fTPdgnKhGZEJEJEdmxnmhlelzk9DjS6bmm6fVUT+5DU4nIhIhMiMhu64me3qu/e7/d97l7b309X+0klYhMiMiEiGzsvLPp+9W5oToXtXL6+0pXT/eQ/6YSkQkRmRCRHfuO9bTa01xNj+tMnz3yJioRmRCRCRHZsbmzu8/2WP2+9ky7959ef7TyZA+lEpEJEZkQkY2tJ5qe26nfld6938r0GvHTz/fNRl5FiMiEiOy2NdbTnh73mR6n2n3+6nn24vMqQkQmRGS/tieq33Scnls6PS5Tex77zng1ISITIrKxnujtPcf0Gujdb1Cu7l9Nrn9SiciEiEyIyG47A7Z625rmavqce2us+VWEiEyIyH7cE8E/VCIyISITIjIhIhMiMiEiEyIyISITIjIhIhMiMiEiEyIyISL7G2WcL0zsTMRlAAAAAElFTkSuQmCC" />
            </a>
          </div>
          <Box
            sx={(theme: any) => ({
              display: "inline-block",
              border: 1,
              borderColor: theme.palette.devider,
              p: 0.5,
            })}
            onClick={() => {
              navigator.clipboard.writeText(BTC_ADDRESS);
              alert("Copied");
            }}
          >
            {BTC_ADDRESS}
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <div>
            <b>Ethereum</b>
          </div>
          <Box
            sx={(theme: any) => ({
              display: "inline-block",
              border: 1,
              borderColor: theme.palette.devider,
              p: 0.5,
            })}
            onClick={() => {
              navigator.clipboard.writeText(ETH_ADDRESS);
              alert("Copied");
            }}
          >
            {ETH_ADDRESS}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          columnGap: 3,
          rowGap: 1,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {t("donations_from")}:{" "}
          {i18n.language === "fa" &&
            `${convertNumberToPersian(formatNumber(totalAmount, "٬"))} ${t(
              "toman",
            )}`}
          {i18n.language !== "fa" && (
            <span style={{ direction: "ltr", margin: "0 5px" }}>
              {`${formatNumber(totalAmount, ",")} ${t("toman")} = ${Math.ceil(
                totalAmount / 26000,
              )} USD`}
            </span>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          {t("order_by")}:
          <SelectButton
            color="inherit"
            variant="text"
            onClick={() => setSortBy("date")}
            selected={sortBy === "date"}
            size="small"
            sx={{ fontSize: "0.8rem", minWidth: "unset" }}
          >
            {t("date")}
          </SelectButton>
          <SelectButton
            color="inherit"
            variant="text"
            onClick={() => setSortBy("amount")}
            selected={sortBy === "amount"}
            size="small"
            sx={{ fontSize: "0.8rem", minWidth: "unset" }}
          >
            {t("amount")}
          </SelectButton>
        </Box>
      </Box>
      {donations.length === 0 && "Fetching donation data..."}
      {donations.length > 0 && <DonationList donations={sortedDonations} />}
      <Box mt={1}>
        <a
          href="https://github.com/rastikerdar/vazirmatn/blob/gh-pages/donations.json"
          target="_blank"
        >
          {t("list_source")}
        </a>
      </Box>
    </Box>
  );
};
