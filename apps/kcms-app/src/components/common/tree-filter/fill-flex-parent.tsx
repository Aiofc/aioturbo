import React, { ReactElement } from "react";
import mergeRefs from "../page/merge-refs.ts";
import useResizeObserver from "use-resize-observer";
import {RefreshCw} from "lucide-react";
import TreeSkeleton from "../../skeleton/tree-skeleton.tsx";

type Props = {
  children: (dimens: {
    width: number | undefined;
    height: number | undefined;
  }) => React.ReactElement;
};

const style = {
  flex: 1,
  width: "100%",
  height: "100%",
  minHeight: 0,
  minWidth: 0,
};

// export const FillFlexParent = React.forwardRef(function FillFlexParent(
//   props: Props,
//   forwardRef
// ) {
//   const { ref, width, height } = useResizeObserver();
//   console.log('width', width, 'height', height);
//   return (
//     <div style={style} ref={mergeRefs(ref, forwardRef)}>
//       {width && height ? props.children({ width, height }) : null}
//     </div>
//   );
// });

export const FillFlexParent = React.forwardRef(function FillFlexParent(
    props: Props,
    forwardRef
) {
  const { ref, width, height } = useResizeObserver();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (width && height) {
      setIsLoading(false);
    }
  }, [width, height]);

  return (
      <div style={style} ref={mergeRefs(ref, forwardRef)}>
        {isLoading ? <TreeSkeleton/> : props.children({ width, height })}
      </div>
  );
});
