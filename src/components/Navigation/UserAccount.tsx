import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import doggo_tinified from "../../media/doggo_tinified.png";

const AccountIcon = ({ collapsedDrawer }: { collapsedDrawer: boolean }) => {
  return (
    <div>
      <Box
        sx={{
          pb: 1,
          pt: 0.5,
          pl: collapsedDrawer ? 0.5 : 1.5,
          pr: 0.5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={doggo_tinified}
          style={{
            backgroundColor: undefined,
            width: 34,
            height: 34,
            WebkitTapHighlightColor: "transparent",
            cursor: "pointer",
          }}
        ></Avatar>

        {!collapsedDrawer && (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", pl: 1, flexGrow: 1 }}>
              <Typography
                textAlign="left"
                variant="caption"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                }}
              >
                Happy Merchant
              </Typography>

              <Typography
                textAlign="left"
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "0.65rem" }}
              >
                happymerchant@happy
              </Typography>
            </Box>
            <IconButton sx={{ px: collapsedDrawer ? 0.5 : 1 }}>
              <ArrowDropDownOutlinedIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      <Divider sx={{ mx: 2 }} />
    </div>
  );
};

export default React.memo(AccountIcon);
