import dateFormat from "dateformat";

import {
    InputAdornment,
    IconButton,
    Typography,
    TextField,
    Drawer,
    Badge,
    Grid,
    Fab,
    styled,
    Tooltip
} from "@mui/material";
import React, {
    useCallback,
    useEffect,
    createRef,
    Fragment,
    useState,
} from "react";
import {Chat, Send} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import {Box} from "@mui/system";

import {ChatDrawerProps, Message} from "./types";
import useStyles from "./styles";

const demoMessages: Message[] = Array(5)
    .fill({})
    .map((_, index) => ({
        id: `msg_${index}`,
        sender: {
            id: `user${index % 2 === 0 ? 1 : 2}`,
            name: `User ${index % 2 === 0 ? "1" : "2"}`,
        },
        content: `Message content ${index}`,
    }));

const consoleMsg = {
    id: `msg_${Math.random().toString(36).substr(2, 9)}`,
    sender: {
        id: `console`,
        name: `Console`,
    },
    content: `Message from console`,
};

const CustomDrawer = styled(Drawer)(({theme}) => ({
    "&.MuiModal-root": {
        zIndex: theme.zIndex.drawer + 101,
    },
}));

var socket: null = null;

const ChatDrawer: React.FC<ChatDrawerProps> = (props) => {
    const currentDate=new Date()
    const {currentUser} = props;
    const [messages, setMessage] = useState<Message[]>([
        ...demoMessages,
        consoleMsg,
    ]);
    const containerRef = createRef<HTMLDivElement>();
    const inputRef = createRef<HTMLInputElement>();
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    /**
     * Scroll to bottom
     */
    const scrollToBottom = useCallback(() => {
        const {current: container} = containerRef;
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            });
        }
    }, [containerRef]);

    /**
     * Toggle chat dialog
     */
    const toggleDialog = (toggle: boolean) => () => setIsOpen(toggle);

    /**
     * Websocket
     */

    //todo jetzt müssen die nachrichten vom websocket eingetragen werden
    /*if (!socket) {
        // @ts-ignore
        const SockJS = window.SockJS;
        // @ts-ignore
        const Stomp = window.Stomp;
        // @ts-ignore
        const tradeId = data.trade.tradeId;

        socket = new SockJS('/tradesocket');
        const stompClient = Stomp.over(socket);
        //stompClient.debug = () => {}
        stompClient.connect({}, function () {
            stompClient.subscribe('/chat_details/' + tradeId, function (message : any) {

                const content = JSON.parse(message.body);

                console.log(content.role);
                console.log(content.message);
                console.log(content.time);
            });
        });
    }*/

    /**
     * Send message
     */
        //todo this is the normal method, which I use. But because you are not using with the backend, it will not work for you, thats why I created
        // the second method for you to test out
    // const sendMessage = () => {
    //     if (inputRef.current) {
    //         const {value: message} = inputRef.current;
    //         if (message) {
    //             post("/addMessage", {
    //                 // @ts-ignore
    //                 message: message
    //             }, function (response: string) {
    //                 if (response === "SUCCESS") {
    //                     setMessage((messages) => [
    //                         ...messages,
    //                         {
    //                             id: `msg_${messages.length}`,
    //                             sender: {
    //                                 id: currentUser.id,
    //                                 name: currentUser.name,
    //                             },
    //                             content: message,
    //                         },
    //                     ]);
    //
    //                     if (inputRef.current) inputRef.current.value = "";
    //                     scrollToBottom();
    //                 } else {
    //                     /*enqueueSnackbar(response, {
    //                         variant: "error",
    //                     });*/
    //                 }
    //             });
    //         }
    //     }
    // };

        // todo try to write "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" in the chat, you will see the problem. The scrollbar shoudn't appear.
        // Also I need date and time before user's name only day, month, hour and minute
    const sendMessage = () => {
            if (inputRef.current) {
                const {value: message} = inputRef.current;
                if (message) {
                    setMessage((messages) => [
                        ...messages,
                        {
                            id: `msg_${messages.length}`,
                            sender: {
                                id: currentUser.id,
                                name: currentUser.name,
                            },
                            content: message,
                        }]);

                    // todo this doesn't work and should be fixed to show an error message if for example the input message is invalid
                    /*enqueueSnackbar(response, {
                        variant: "error",
                    });*/
                }
            }
        };

    const post = (path: string, params: string[], callback: Function) => {
        // The rest of this code assumes you are not using a library.
        // It can be made less verbose if you use one.
        const form = document.createElement('form');
        path = window.location.href + path;
        form.method = 'post';
        form.action = path;

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
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
    }

    /**
     * Send message on key press
     */
    const sendMessageOnKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === "Enter") {
            sendMessage();
        }
    };

    /**
     * Scroll to bottom on dialog open
     */
    useEffect(() => {
        if (isOpen) {
            setTimeout(scrollToBottom, 100);
        }
    }, [isOpen, scrollToBottom]);

    return (
        <Fragment>
            <CustomDrawer
                classes={{paper: classes.chatPaper}}
                onClose={toggleDialog(false)}
                anchor="right"
                open={isOpen}
            >
                <Grid
                    sx={{height: "100%"}}
                    flexDirection="column"
                    flexWrap="nowrap"
                    overflow="hidden"
                    rowSpacing={2}
                    container
                >
                    <Grid item xs="auto">
                        <Typography variant="h6" component="span">
                            Chat
                        </Typography>
                    </Grid>
                    <Grid item xs sx={{overflow: "hidden"}}>
                        <div className={classes.container} ref={containerRef}>
                            <Grid container flexDirection="column" flexWrap="nowrap">
                                {messages.map((message, index) => (
                                    // Message START
                                    <Grid item key={index}>
                                        {dateFormat(currentDate, "dddd, mmmm dS, yyyy,")}

                                        <Box bgcolor={grey[900]} borderRadius={2} p={1} mb={1} display="flex" flexWrap="wrap">
                                            

                                            <Box paddingRight={1}>
                                          

                                            <Typography
                                                color={
                                                    message.sender.id === "console"
                                                        ? "error"
                                                        : message.sender.id === "user1"
                                                            ? "yellowgreen"
                                                            : "primary"
                                                }
                                                fontWeight="bold"
                                                
                                            >
                                                {message.sender.name}:
                                            </Typography>
                                           
                                            </Box>

                                          <Box>
                                         
                                            <Typography  variant="subtitle1" className={classes.chatMessage}>
                                                {message.content}
                                            </Typography>
                                          </Box>
                                           
                                        </Box>
                                    </Grid>
                                    // Message END
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={sendMessage}>
                                            <Send/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onKeyPress={sendMessageOnKeyPress}
                            inputRef={inputRef}
                            placeholder="Write here..."
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </CustomDrawer>

            {/* Chat button */}
            <Fab
                onClick={toggleDialog(!isOpen)}
                className={classes.chatButton}
                color="primary"
            >
                <Badge
                    anchorOrigin={{horizontal: "left", vertical: "top"}}
                    color="secondary"
                    badgeContent={5}
                >
                    <Chat/>
                </Badge>
            </Fab>
        </Fragment>
    );
};

export default ChatDrawer;
