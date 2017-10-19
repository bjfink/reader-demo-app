import React from 'react';
import classnames from 'classnames';

function TableOfContents({ chapters, handleSelectChapter, selectedChapterId }) {
  return (
    <ul className="toc">
      {chapters.map(chapter => {
        const selected = chapter.id === selectedChapterId;

        return (<li className={classnames({ 'active': selected })}
          key={chapter.id}
          onClick={() => handleSelectChapter(chapter.id)}>
          {chapter.title}
        </li>
        )
      }
      )}
    </ul>
  )
}
export default TableOfContents
