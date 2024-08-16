import React, { useEffect, useState,useCallback,useRef} from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "./Chat.module.css";
import images from "../../../assets";
import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });
  const [localFriendMsg, setLocalFriendMsg] = useState(friendMsg);
  const intervalRef = useRef(null);
  const fname = useRef("");

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.address) {
      setChatData(router.query);
    }
  }, [router.isReady, router.query]);

  const fetchData = useCallback(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, [chatData.address, readMessage, readUser]);

  useEffect(() => {
    fetchData(); // Fetch initial data

    intervalRef.current = setInterval(fetchData, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData]);

  // Update localFriendMsg when friendMsg changes
  useEffect(() => {
    setLocalFriendMsg(friendMsg);
  }, [friendMsg]);

  const handleOnClick = async () => {
    try {
      //e.preventDefault();
      console.log("handle roi ne")
      functionName({
        msg: message,
        address: chatData.address,
      });
      fname.current.value = "";
      setMessage("");
    } catch (error) {
      console.error("Error reading message:", error);
    }
  };
  
  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress && (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {localFriendMsg.map((el, i) => (
              <div key = {i}>
                {el.sender === chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {userName} <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p>{el.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress && (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
                ref={fname}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading ? (
                <Loader />
              ) : (
                <Image
                    src={images.send}
                    alt="send"
                    width={50}
                    height={50}
                    onClick={
                      handleOnClick
                    }
                  />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Chat);


