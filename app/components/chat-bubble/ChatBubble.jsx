import React from "react";
import styles from "./ChatBubble.module.css";
import PropTypes from "prop-types";

const renderTextWithLinks = (text) => {
  // Regex to match links, phone numbers and email addresses all into one separated by |
  const regex =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(\d{3}[-.\s]??\d{3}[-.\s]??\d{4})|([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const elements = [];
  let lastIndex = 0;
  let linkCounter = 1;

  let match;
  while ((match = regex.exec(text))) {
    // adding preceding text
    if (lastIndex < match.index) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // markdown link
      elements.push(
        <a
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          key={match.index}
        >
          [{linkCounter}] {match[1]}
        </a>
      );
      linkCounter++;

    } else if (match[3]) {
      // Phone 
      elements.push(
        <a href={`tel:${match[3]}`} key={match.index}>
          {match[3]}
        </a>
      );
    } else if (match[4]) {
      // Email
      elements.push(
        <a href={`mailto:${match[4]}`} key={match.index}>
          {match[4]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  // adding remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <>{elements}</>;
};



const ChatBubble = ({ text, isUser, avatar }) => (
  <div
    className={`${styles.bubble} ${
      isUser ? styles.userMessage : styles.botMessage
    }`}
  >
    {!isUser && avatar}
    <span className={styles.messageText}>{renderTextWithLinks(text)}</span>
  </div>
);

ChatBubble.propTypes = {
  text: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ChatBubble;