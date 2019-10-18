
import React from 'react';
import Lightbox from 'react-image-lightbox';

import { HandleClickParams } from '../../../types';

import 'react-image-lightbox/style.css';
import './AnalysisImage.css';


const AnalysisImage: React.FunctionComponent<{
  imageData: any;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const src = URL.createObjectURL(props.imageData);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {isOpen &&
        <Lightbox
          mainSrc={src}
          onCloseRequest={() => setIsOpen(false)}
        />
      }
      <div
        className="analysis-image-container"
        onClick={(e: React.MouseEvent) => {
          setIsOpen(true);
          e.stopPropagation();
        }}
      >
        <img src={src}/>
      </div>
    </>
  )
};


export default AnalysisImage;
