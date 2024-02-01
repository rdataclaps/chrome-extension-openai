import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export default function ListViewMessage({ content, evidence, isUser, avatar, userName, isEditable, onEdit }) {
    const [evidenceOpen, setEvidenceopen] = useState(false);
    const isQuestion = isUser;

    return (
        <div className={`message ${isUser ? "user-message" : "ai-message"}`}>
            {isQuestion
                ? <div className="message-content">
                    {content}
                </div>
                : <div>
                    {evidenceOpen
                        ? (<div>
                            <div className="message-content">
                                {content}
                                <div style={{ paddingLeft: '98%' }}>
                                    <SlArrowUp onClick={(e) => setEvidenceopen(false)} />
                                </div>
                                {evidence.page_content.map((content, i) => <div className="message-evidence">
                                    <b>{evidence.metadata[i].filename}, page #{evidence.metadata[i].page}</b>
                                    <p>"{content}"</p>
                                </div>)}
                            </div>
                        </div>
                        )
                        : <React.Fragment>
                            <div className="message-content">{content}</div>
                            <div style={{ paddingLeft: '98%' }}>
                                <SlArrowDown onClick={(e) => setEvidenceopen(true)} />
                            </div>
                        </React.Fragment>
                    }
                </div>

            }
        </div>
    )
}
