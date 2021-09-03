import React, { useCallback, useEffect } from 'react';
import { drag, select, Selection } from 'd3';

export interface IUseDragProps {
  start: () => void;
  drag: () => void;
  end: () => void;
};

function useDrag(selection: any, handlers: IUseDragProps) {
  useEffect(() => {
    selection.call(
      drag().on('start', handlers.start).on('drag', handlers.drag).on('end', handlers.end)
    );
  }, []);
}

export {
  useDrag
};