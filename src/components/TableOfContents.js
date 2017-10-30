import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

function TableOfContents({ chapters, handleSelectChapter, selectedChapterId, baseUrl }) {
  return (
    <ul className="toc">
      {chapters.map(chapter => {
        const selected = chapter.id === selectedChapterId;

        return (
          <Link to={`${chapter.id}`}  key={chapter.id} >
            <li className={classnames({ 'active': selected })}>
              {chapter.title}
            </li>
          </Link>
        )
      }
      )}
    </ul>
  )
}
export default TableOfContents
