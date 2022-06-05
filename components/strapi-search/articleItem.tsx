import React from "react";

function ArticleItem({ hit, components }) {
  return (
    <a className="aa-ItemLink" href={`/article/${hit.slug}`}>
      <div className="aa-ItemContent">
        <div className="ItemCategory">{hit.tags[0]}</div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="title" />
          </div>

        </div>
      </div>
    </a>
  );
};

export default ArticleItem;
