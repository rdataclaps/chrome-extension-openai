import React, { useEffect, useRef, useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Resizable } from 'react-resizable';
import AIMessageLoader from './AIMessageLoader';

function ResizableColumn({ initialWidth, onResize }) {
  const [width, setWidth] = useState(initialWidth);

  const handleResize = (_, { size }) => {
    setWidth(size.width);
    onResize(size.width);
  };

  return (
    <Resizable
      width={width}
      height={0}
      handle={<div style={{ width: '10px', height: '100%', cursor: 'col-resize',margin: '1px' }} />}
      onResize={handleResize}
    >
      <div >{/* Empty div to enable resizing */}</div>
    </Resizable>
  );
}

function GridViewMessages({ messages, isFetching }) {
  const [columnWidth, setColumnWidth] = useState(250);

  const data = messages.filter((message ) => {
    return ( message.message_type==="question")
    })
    .map ((message,index) => {
      return {
        id : index+1,
        question:message.message_text,
        answer:''
      }
  });
  
  const dataPairs = messages.filter((message) => {
    return message.message_type==='answer';
  })
  .map((message, index) => {
    return {
      ...data[index], 
      answer: message.message_text,
      evidence: {page_content: message?.context_text, metadata: message?.message_metadata},
      aiMessageHeight: 0,
      evMessageHeight: 0,
    }
  });

  const [isOpen, setIsOpen] = useState(Array(dataPairs.length).fill(false));
  const mainDivRefs = useRef(dataPairs.map(() => React.createRef()));

  const lastIndex=messages.length-1;
  if(messages[lastIndex].message_type==='question') {
    dataPairs.push({question:messages[lastIndex].message_text, answer: ''});
  }

  const handleResize = (width) => {
    setColumnWidth(width);
  };

  const showFullContext = (event, index, refer) => {
    const evref = refer.current.querySelector('.ev-message');
    const questionRef = refer.current.querySelector('.user-message');
    const answerRef = refer.current.querySelector('.a-message');
    evref.style.height = 'fit-content';
    answerRef.style.height = `${evref.clientHeight}px`;
    questionRef.style.height = `${evref.clientHeight}px`;
    setIsOpen(prevOpen => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !prevOpen[index];
      return updatedOpen;
    });
  }

  const showHideContext = (event, index, refer) => {
    const evref = refer.current.querySelector('.ev-message');
    const questionRef = refer.current.querySelector('.user-message');
    const answerRef = refer.current.querySelector('.a-message');
    answerRef.style.height = 'fit-content';
    evref.style.height = `${answerRef.clientHeight}px`;
    questionRef.style.height = `${answerRef.clientHeight}px`;
    setIsOpen(prevOpen => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !prevOpen[index];
      return updatedOpen;
    });
  }

  // set initial value for heights
  useEffect(() => {
    mainDivRefs.current.forEach((mainDivRef, index) => {
      const answerRef = mainDivRef.current.querySelector('.a-message');
      const contextRef = mainDivRef.current.querySelector('.ev-message');

      if (dataPairs[index]['aiMessageHeight'] === 0 && dataPairs[index]['evMessageHeight'] === 0) {
        const aiMessageHeight = answerRef.clientHeight;
        const evMessageHeight = contextRef.clientHeight;
        dataPairs[index]['aiMessageHeight'] = aiMessageHeight;
        dataPairs[index]['evMessageHeight'] = evMessageHeight;
      }
    });

  }, [dataPairs]);

  // default state
  useEffect(() => {
    mainDivRefs.current.forEach((mainDivRef, index) => {
      const questionRef = mainDivRef.current.querySelector('.user-message');
      const answerRef = mainDivRef.current.querySelector('.a-message');
      const contextRef = mainDivRef.current.querySelector('.ev-message');

      const defaultHeight = answerRef.clientHeight;

      questionRef.style.height = `${defaultHeight}px`;
      answerRef.style.height = `${defaultHeight}px`;
      contextRef.style.height = `${defaultHeight}px`;
    });
  }, []);

  return (
    <div>
      {dataPairs.map((pair, index) => (
        <div key={index} style={{ display: 'flex' }} ref={mainDivRefs.current[index]}>
          <div className='message user-message' style={{ flex: `0 0 ${columnWidth}px` }}>
            <div className="message-content">{pair.question}</div>
          </div>

          <ResizableColumn initialWidth={columnWidth} onResize={handleResize} />

          {isFetching && index === dataPairs.length - 1 ? (
            <AIMessageLoader />
          ) : (
            <div className='message a-message' style={{ flex: `0 0 ${columnWidth}px`, height: 'fit-content' }}>
              <div className="message-content">{pair.answer}</div>
            </div>
          )}

          <ResizableColumn initialWidth={columnWidth} onResize={handleResize} />

          {isFetching && pair.answer==='' ? (
            <></>
          ) : (
            <div className='message ev-message' style={{marginRight: '10px', overflow: 'hidden', padding: '5px', position: 'relative'}}>
              {
                !isOpen[index] ? (
                  <div style={{ paddingLeft:'87%', backgroundColor: 'rgb(29, 31, 33)', paddingRight:'3%', borderRadius:'2px'}}>
                    <SlArrowDown style={{paddingLeft:'4px'}} onClick={(e) => showFullContext(e, index, mainDivRefs.current[index])} />
                  </div>
                ) : (
                  <div style={{ paddingLeft:'87%', backgroundColor: 'rgb(29, 31, 33)', paddingRight:'3%', borderRadius:'2px'}}>
                    <SlArrowUp  style={{paddingLeft:'4px'}} onClick={(e) => showHideContext(e, index, mainDivRefs.current[index])} />
                  </div>
                )
              }
              {pair.evidence.page_content.map((content, i) => <div className="message-evidence">
                  <b>{pair.evidence.metadata[i].filename}, page #{pair.evidence.metadata[i].page}</b>
                  <p>"{content}"</p>
              </div>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GridViewMessages;
