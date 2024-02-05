import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineSend, AiOutlineUnorderedList } from "react-icons/ai";
import { BiDownload, BiPencil } from "react-icons/bi";
import { BsFillGrid3X3GapFill, BsFillXCircleFill } from "react-icons/bs";
import { FiMenu, FiMessageSquare, FiTrash } from "react-icons/fi";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { writeFile, utils as xlUtils } from 'xlsx';
import { createChat, deleteChat, getChats, updateChat, updateCurrentChat } from "../../redux/actions/chatActions";
import { addMessage, createMessage, getMessages } from "../../redux/actions/chatMessageActions";
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from "../../redux/actions/templateActions";
import Avatar from "../assets/Images/Avatar/user.png";
import Avatar2 from "../assets/Images/Avatar/user_2.png";
import AIMessageLoader from "./AIMessageLoader";
import ChatLoader from "./ChatLoader";
import GridViewMessages from "./GridViewMessages";
import ListViewMessage from "./ListViewMessage";

const ChatInterface = ({ selectedFileIds, chatSpecific }) => {
  const dispatch = useDispatch();
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const templates = useSelector(state => state.template.templates)
  const [editMessageIndex, setEditMessageIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showTabs, setShowTabs] = useState(true);
  const currentChat = useSelector(state => state.chat.currentChat);
  const messages = useSelector(state => state.message.messages);
  const loading = useSelector(state => state.message.fetching);
  const username = useSelector(state => state.user?.user?.name);

  const allChats = useSelector(state => state.chat.chats);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (chatSpecific) {
      setChats(allChats.filter(chat => chat.chat_specific || false));
    } else {
      setChats(allChats.filter(chat => !(chat.chat_specific || false)));
    }
  }, [allChats, chatSpecific]);

  const userAvatar = Avatar;
  const scrollRef = useRef(null);
  // const inputRef = useRef(null);
  const [chatTitle, setChatTitle] = useState('');
  const [editingChat, setEditingChat] = useState(null);
  const [templateTitle, setTemplateTitle] = useState('');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [answerformat, setAnswerformat] = useState('list');
  const [isFetching, setIsFetching] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('48px');
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [displayTextarea, setDisplayTextarea] = useState(false);
  const [abortController, setAbortController] = useState(null);
  

  const createAbortController = () => {
    const controller = new AbortController();
    setAbortController(controller);
    return controller;
  };
  

  const toggleFormat = () => {
    setAnswerformat(answerformat === 'list' ? 'grid' : 'list');
  };

  const handleTextareaChange = (e) => {
    setInputValue(e.target.value);
    setTextareaHeight('48px');
    const scrollHeight = e.target.scrollHeight;
    if (scrollHeight > e.target.clientHeight) {
      setTextareaHeight(scrollHeight + 'px');
    }
  };

  const stopGenerating = useCallback(() => {
    setIsFetching(false);
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setInputValue("");
      setTextareaHeight('48px');
      setRequestInProgress(false);
    }
  }, [abortController]);

  const handleClick = () => {
    setShowTabs(!showTabs);
  };

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setEditingChat(null);
      setEditingTemplate(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    const cleanup = () => {
      stopGenerating();
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [stopGenerating, chats]);

  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (inputRef.current && !inputRef.current.contains(event.target)) {
    //     stopGenerating();
    //   }
    // };
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        stopGenerating();
      }
    };
    // window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      // window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [stopGenerating]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  useEffect(() => {
    dispatch(getChats());
    dispatch(getTemplates());
  }, [dispatch])

  useEffect(() => {
    if (chats.length > 0) {
      dispatch(updateCurrentChat(chats[0]));
      dispatch(getMessages(chats[0]?.id));
    } else {
      dispatch(updateCurrentChat(null));
    }
  }, [chats, dispatch]);

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;
    if (Array.isArray(selectedFileIds) && selectedFileIds.length === 0) {
      toast.info("please select a file", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 2000
      })
      return
    }
    if (requestInProgress) return;
    setDisplayTextarea(false);
    const questions = inputValue.split('\n');

    if (!currentChat) {
      toast.info('Select a chat', {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 2000
      });
      return;
    }
    setRequestInProgress(true);
    setInputValue("");
    setTextareaHeight('48px');
    const controller = createAbortController();

    const batchSize = 1;
    const groupedQuestions = [];

    // Split questions into batches of 5
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      groupedQuestions.push(batch);
    }

    // Process each batch
    for (let batchIndex = 0; batchIndex < groupedQuestions.length; batchIndex++) {
      const batch = groupedQuestions[batchIndex];
      const ques_data = batch
        .filter(ques => ques.trim() !== "")
        .map(ques => ({
          data_ids: selectedFileIds,
          chat_id: currentChat?.id,
          query: ques.trim(),
          context: "true"
        }));
      if (ques_data.length === 0){
        continue
      }
      const payload = {
        "queries_data": ques_data
      };
    
      const userMessage = {
        // message_text: `Generating batch ${batchIndex + 1} of ${groupedQuestions.length}...`,
        message_text: ques_data[0].query,
        message_type: "question",
      };
    
      dispatch(addMessage(userMessage));
      setIsFetching(true);
    
      try {
        await dispatch(createMessage(payload, controller.signal));
      } catch (error) {
        if (error.name === 'AbortError' || error.name === 'CanceledError') {
          console.error('Request was canceled.');
          setIsFetching(false);
        }
      }
    }

    setIsFetching(false);
    setTextareaHeight('48px');
    setRequestInProgress(false);
  };

  const switchChat = (chat) => {
    setEditMessageIndex(null);
    dispatch(getMessages(chat?.id));
    dispatch(updateCurrentChat(chat))
  };

  const switchTemplate = (template) => {
    if (template.questions !== null) {
      setTextareaHeight('auto');
      setInputValue((template.questions).replace(/\\n/g, '\n'));
    }
    setCurrentTemplate(template)
    dispatch(getTemplates(template?.id))
  }

  const editMessage = (messageIndex) => {
    setEditMessageIndex(messageIndex);
  };

  const startNewChat = () => {
    const newChatId = `New Chat${chats?.length + 1}`;
    const newChat = {
      title: newChatId,
      chat_specific: chatSpecific
    };
    dispatch(createChat(newChat));
  };

  const handleEditChat = (chat) => {
    setEditingChat(chat);
    setChatTitle(chat?.title);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateTitle(template?.title)
  }

  const handleSaveAsTemplate = () => {
    const newTemplateTitle = `New Template${templates?.length + 1}`;
    const newData = inputValue.replace(/\n/g, '\\n');
    dispatch(createTemplate({ questions: newData, title: newTemplateTitle }));
  }

  const handleSaveTemplate = (template) => {
    if (editingTemplate) {
      dispatch(updateTemplate({ id: template.id, title: templateTitle, questions: template.questions }));
      setEditingTemplate(null);
    }
  }

  const handleSaveChat = (id) => {
    if (editingChat) {
      dispatch(updateChat({ id: id, title: chatTitle }));
      setEditingChat(null);
    }
  }

  const handleCancel = () => {
    setEditingChat(null);
    setEditingTemplate(null);
  };

  const trashChat = (id) => {
    dispatch(deleteChat({ chat_id: id }));
    if (currentChat?.id === id) {
      dispatch(updateCurrentChat(null));
    }
  }

  const trashTemplate = (id) => {
    dispatch(deleteTemplate({ id: id }));
    if (currentChat?.id === id) {
      setCurrentTemplate(null)
    }
  }
  const data = messages.filter((message) => {
    return (message.message_type === "question")
  })
    .map((message, index) => {
      return {
        SerialNumber: index + 1,
        question: message.message_text
      }
    });

  const mainData = messages.filter((message) => {
    return message.message_type === 'answer';
  })
    .map((message, index) => {
      return {
        ...data[index],
        answer: message.message_text,
        evidence: { page_content: message?.context_text, metadata: message?.message_metadata }
      }
    });

  const handleDownload = (e) => {
    e.preventDefault();
    const fields = ['Serial-Number', 'question', 'answer', 'evidence'];
    try {
      const ws = xlUtils.json_to_sheet(mainData, { fields });
      ws['!cols'] = [{ wch: 20 }, { wch: 30 }, { wch: 40 }, { wch: 40 }];
      const wb = xlUtils.book_new();
      xlUtils.book_append_sheet(wb, ws, 'Sheet-1');
      writeFile(wb, 'test.xlsx');
    } catch (error) {
      console.error('Error generating XLSX:', error);
    }
  };

  return (
    <div className="chat-interface">
      {/* {showTabs && ( */}
      <div className="tabs" style={{ minWidth: showTabs ? '250px' : '64px', background: showTabs ? '#f4f4f5' : '', marginTop: 0 }}>
        <div className={`tabs-toggle ${showTabs ? "active" : ""}`} >
          <button onClick={handleClick} className="btn">
            <FiMenu />
          </button>
        </div>
        <div className="tabs_top" style={{ display: showTabs ? 'block' : 'none'}}>
          <div className="tab new-chat-tab" style={{ cursor: "pointer" }} onClick={startNewChat}>
            <AiOutlinePlus /> <p>New Chat</p>
          </div>
        </div>
        <div className="chat_history" style={{ display: showTabs ? 'flex' : 'none' }}>
          {chats.map((chat) => (
            <div
              key={chat?.id}
              onClick={() => switchChat(chat)} style={{ cursor: "pointer" }}
              className={`tab ${chat?.id === currentChat?.id ? "active" : ""}`}
            >
              {editingChat?.id === chat?.id ? (
                <>
                  <input
                    type="text"
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                    // onBlur={handleCancel}
                    autoFocus
                  />
                  <ImCheckmark className="icons" style={{ margin: '0 5px' }} onClick={() => handleSaveChat(chat?.id)} />
                  <ImCross className="icons" style={{ margin: '0 5px' }} onClick={() => handleCancel()} />
                </>
              ) : (
                <>
                  <p>
                    <FiMessageSquare className="icons" /> {chat?.title}
                  </p>
                  {currentChat?.id === chat.id && <span>
                    <BiDownload className="icons" onClick={(e) => handleDownload(e)} />
                    <BiPencil className="icons" onClick={() => handleEditChat(chat)} />
                    <FiTrash className="icons" onClick={() => trashChat(chat?.id)} />
                  </span>}
                </>
              )}
            </div>
          ))}
        </div>

        {showTabs && <hr></hr>}
        <div className="tabs_top" style={{ display: showTabs ? 'block' : 'none' }}>
          {/* <div className="tab new-template-tab" style={{ cursor: "pointer" }} onClick={handleSaveAsTemplate}>
            <AiOutlinePlus /> <p>Save as Template</p>
          </div> */}
        </div>
        <div className="template_history" style={{ display: showTabs ? 'flex' : 'none' }}>
          {templates.map((template) => (
            <div
              key={template?.id}
              onClick={() => switchTemplate(template)} style={{ cursor: "pointer" }}
              className={`tab ${template?.id === currentTemplate?.id ? "active" : ""}`}
            >
              {editingTemplate?.id === template?.id ? (
                <>
                  <input
                    type="text"
                    value={templateTitle}
                    onChange={(e) => setTemplateTitle(e.target.value)}
                    autoFocus
                  />
                  <ImCheckmark className="icons" style={{ margin: '0 5px' }} onClick={() => handleSaveTemplate(template)} />
                  <ImCross className="icons" style={{ margin: '0 5px' }} onClick={() => handleCancel()} />
                </>
              ) : (
                <>
                  <p>
                    <FiMessageSquare className="icons" /> {template?.title}
                  </p>
                  {currentTemplate?.id === template.id && <span>
                    <BiPencil className="icons" onClick={() => handleEditTemplate(template)} />
                    <FiTrash className="icons" onClick={() => trashTemplate(template?.id)} />
                  </span>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-windows">
        <div className="chat-window">
          {/* <div className={`tabs-toggle ${showTabs ? "active" : ""}`}>
            <button onClick={handleClick} className="btn">
              <FiMenu />
            </button>padding: '17px',
          </div> */}
          {Array.isArray(messages) && messages.length > 0 && (
            <div style={{ position: "absolute", margin: '17px', fontSize: '24px', bottom: '142px', right: '20px', zIndex: 2 }} onClick={toggleFormat}>
              {answerformat !== 'list' ? <AiOutlineUnorderedList /> : <BsFillGrid3X3GapFill />}
            </div>
          )}
          {
            requestInProgress && (
              <div
                style={{
                  position: "absolute",
                  margin: '17px',
                  fontSize: '16px',
                  bottom: '94px',
                  right: '20px',
                  padding: '5px 10px 5px 5px',
                  borderRadius: '4px',
                  backgroundColor: 'rgb(96 100 142)'
                }}
                onClick={stopGenerating}>Stop Generating Answer</div>
            )
          }
          <div className="chat-history">
            {displayTextarea && <BsFillXCircleFill style={{
              alignSelf: "self-start", fontSize: '24px',
              position: "absolute", top: '92px', right: '10px'
            }} onClick={() => setDisplayTextarea(false)} />}
            {currentChat && (
              <div className={`chat_title ${showTabs ? "active" : ""}`}>
                <h1>Hello world</h1>
                <span>
                  <img src={Avatar2} alt="" />
                  <h3 className="title">
                    {chats.find((chat) => chat?.id === currentChat?.id)?.title}
                  </h3>
                </span>
                <BiPencil className="icons" />
              </div>
            )}
            {!(Array.isArray(messages) && messages.length > 0) && loading ? (
              <ChatLoader />
            ) : currentChat ? (
              Array.isArray(messages) && messages.length > 0 ? answerformat === 'list' ? (
                messages.map((message, index) => (
                  <div key={index} ref={scrollRef}>
                    {isFetching && index === messages.length - 1 && message?.message_type === 'question' ? (
                      <>
                        <ListViewMessage
                          key={index}
                          content={message?.message_text}
                          isUser={message?.message_type === 'question' ? true : false}
                          avatar={message?.message_type === 'question' ? userAvatar : null}
                          userName={message?.message_type === 'question' ? username : 'AI'}
                          isEditable={editMessageIndex === index}
                          onEdit={() => editMessage(index)}
                        />
                        <AIMessageLoader />
                      </>
                    ) : (
                      <ListViewMessage
                        key={index}
                        content={message?.message_text}
                        isUser={message?.message_type === 'question' ? true : false}
                        avatar={message?.message_type === 'question' ? userAvatar : null}
                        userName={message?.message_type === 'question' ? username : 'AI'}
                        isEditable={editMessageIndex === index}
                        evidence={{ page_content: message?.context_text, metadata: message?.message_metadata }}
                        onEdit={() => editMessage(index)}
                      />
                    )}
                  </div>
                ))
              ) : (
                <GridViewMessages messages={messages} sref={scrollRef} isFetching={isFetching} />
              ) : (
                <div
                  style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: "center", height: '100%'
                  }}
                  onClick={() => setDisplayTextarea(true)}
                >
                  {!displayTextarea ? (
                    <h4 style={{ fontSize: '24px' }}>Start a conversation</h4>
                  ) : (
                    <textarea
                      type="text"
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={handleTextareaChange}
                      style={{ height: '96%', marginBottom: '15px' }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    ></textarea>
                  )}
                </div>
              )
            ) : (
              <div
                style={{
                  display: 'flex', justifyContent: 'center',
                  alignItems: "center", height: '100%'
                }}
              >
                <h4 style={{ fontSize: '24px' }}>Please select a chat</h4>
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
          {!displayTextarea && (
            <textarea
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              rows={inputValue.split('\n').length + 1}
              onChange={handleTextareaChange}
              style={{ height: textareaHeight }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={requestInProgress}>
            </textarea>
          )}
          <button
            onClick={sendMessage}
            disabled={requestInProgress}
            className="send_btn"
          >
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
