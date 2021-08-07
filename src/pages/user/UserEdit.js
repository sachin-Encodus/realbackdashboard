import * as React from "react";
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
export default function Useredit() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [prouser, setProuser] = React.useState(true);
  const [modal, setModel] = React.useState(false);
  const modalOpen = () => setModel(true);
  const modalClose = () => setModel(false);
  const [panmodal, setPanmodel] = React.useState(false);
  const panOpen = () => setPanmodel(true);
  const panClose = () => setPanmodel(false);

  const [userdata, setUserdata] = React.useState("");
  const { userId } = useParams();
  const { name, email, mobile, role } = userdata;

  const dummy = {
    number: 9999988888,
    status: "null",

    expiredate: "30/10/2021",
    date: "2021-07-30T17:44:45.080+00:00",
    subId: "636748374657845",
    adhaarImg:
      "https://assets.website-files.com/5f689f82910c6b4f1ffb855b/5f9cea690debe2146d6eb5a3_aadhar%20card%402x.png",
    adhaarBackImg:
      "https://assets.website-files.com/5f689f82910c6b4f1ffb855b/5f9cea690debe2146d6eb5a3_aadhar%20card%402x.png",
    panImg:
      "https://www.solutionbeast.com/wp-content/uploads/2017/02/Pan-Card_final-signature-660x330.png",
  };

  const handleClick = () => {
    setProuser(!prouser);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
    statusUpdate(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    axios
      .get(`http://localhost:5000/api/user/${userId}`)
      .then(({ data }) => setUserdata(data.user))
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    number,
    date,
    expiredate,
    status,
    _id,
    adhaarImg,
    adhaarBackImg,
    panImg,
  } =
    userdata && userdata.subscriber[0] !== undefined
      ? userdata && userdata.subscriber[0]
      : dummy;

  const statusUpdate = async (value) => {
    const res = await axios.post("http://localhost:5000/api/approved", {
      subID: _id,
      userId,
      value,
      email,
    });

    setUserdata(res.data.result);
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
              <ListItemText primary="Number" secondary={mobile} />
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
                    <ListItemText primary="User Type" secondary={role} />
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
              <div>
                <Modal
                  open={modal}
                  onClose={modalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  // style={{ overflow: "scroll" }}
                >
                  <Box sx={style}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <img src={adhaarImg} alt="login" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <img src={adhaarBackImg} alt="login" />
                      </Grid>
                    </Grid>

                    {/* <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography> */}
                  </Box>
                </Modal>
                <Modal
                  open={panmodal}
                  onClose={panClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  // style={{ overflow: "scroll" }}
                >
                  <Box sx={style}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <img src={panImg} alt="login" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <img
                          src="https://assets.website-files.com/5f689f82910c6b4f1ffb855b/5f9cea690debe2146d6eb5a3_aadhar%20card%402x.png"
                          alt="login"
                        />
                      </Grid>
                    </Grid>

                    {/* <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography> */}
                  </Box>
                </Modal>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <ListItemText primary="Adhaar" />
                  <Button onClick={modalOpen}>Open Adhaar</Button>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Pan Card" />
                  <Button onClick={panOpen}>Open Pan</Button>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="Number" secondary={number} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="subscription" secondary={status} />
                </Grid>

                <Grid item xs={6}>
                  <ListItemText primary="issue date" secondary={date} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary="plan expiry" secondary={expiredate} />
                </Grid>
              </Grid>
            </Box>
            <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
              Open the select
            </Button>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Profile
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={age}
                label="Profile"
                onChange={handleChange}
              >
                <MenuItem value="Profile">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="approved">Aprooved</MenuItem>
                <MenuItem value="reject">Reject</MenuItem>
                <MenuItem value="request">request</MenuItem>
                <MenuItem value="member">Member</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
