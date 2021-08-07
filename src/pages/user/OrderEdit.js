import * as React from "react";
import { useState, useEffect } from "react";

import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import "./user.css";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import MailRoundedIcon from "@material-ui/icons/MailRounded";
import LocalPhoneRoundedIcon from "@material-ui/icons/LocalPhoneRounded";
import StarBorder from "@material-ui/icons/StarBorder";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useParams } from "react-router-dom";
import axios from "axios";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    background: "rgb(255, 255, 255)",
    border: 0,
    borderRadius: 3,
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px;",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "#000",
  border: "none",
  boxShadow: 24,
  p: 4,
};
export default function Orderedit() {
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [prouser, setProuser] = useState(true);

  const [userdata, setUserdata] = useState("");
  const { userId } = useParams();
  const updateStatus = (event) => {
    setAge(event.target.value);

    statusUpdate(event.target.value);
  };

  const {
    _id,
    name,
    email,
    Address,
    number,
    orderOtp,
    city,
    country,
    state,
    pincode,
    totalPrice,
    mode,
    message,
    company,
    status,
  } = userdata;
  console.log("=====================xxxx", userId);

  console.log(
    "====================================",
    _id,
    name,
    email,
    Address,
    number,
    orderOtp,
    city,
    country,
    state,
    pincode,
    totalPrice,
    mode,
    message,
    company,
    status
  );

  const statusUpdate = async (value) => {
    console.log("===>>>>>>>>>>>>yyy", value);

    const res = await axios.post("http://localhost:5000/api/status", {
      userId,
      value,
      email,
    });

    console.log("oppp==========", res.data.result);
    setUserdata(res.data.result);
  };

  useEffect(() => {
    cartdata();
  }, []);
  const cartdata = () => {
    axios
      .get(`http://localhost:5000/api/cartid/${userId}`)
      .then(({ data }) => {
        console.log(data.user);
        setUserdata(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setProuser(!prouser);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <List className="userUpdate">
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" secondary={name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MailRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalPhoneRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Number" secondary={number} />
            </ListItem>

            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Realback Member
                </ListSubheader>
              }
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {prouser ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={prouser} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Adhaar" secondary="7975 2051 ****" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            className="userUpdate"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <ListItemText primary="_id" secondary={_id} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Name" secondary={name} />
                </Grid>
                {/* <Grid item xs={6}>
                  <ListItemText primary="Number" secondary={number} />
                </Grid> */}
                <Grid item xs={6}>
                  <ListItemText primary="Company" secondary={company} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary="Problem"
                    secondary={
                      userdata &&
                      userdata.products.map((item) => {
                        return item.name;
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Message" secondary={message} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Payment Mode" secondary={mode} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="OrderOtp" secondary={orderOtp} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Order Date" secondary="29/07/2021" />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Price" secondary={`$ ${totalPrice}`} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary="Address"
                    secondary={(Address, city, state, country)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Status" secondary={status} />
                </Grid>
              </Grid>
            </Box>
            <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
              Open the select
            </Button>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Order
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={age}
                label="Order"
                onChange={updateStatus}
              >
                <MenuItem value="orderd">
                  <em>orderd</em>
                </MenuItem>
                <MenuItem value={"picked"}>picked</MenuItem>
                <MenuItem value={"patner store"}>our patner store</MenuItem>
                <MenuItem value={"repaired"}>repaired</MenuItem>
                <MenuItem value={"deliverd"}>deliverd</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
