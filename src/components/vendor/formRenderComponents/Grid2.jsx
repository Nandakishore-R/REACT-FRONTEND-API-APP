import { Component } from "react";
export default function Grid2  (props)  {
  const { value = {}, onChange, readOnly } = props;
  

  const handelChangeData = (data) => onChange({ ...value, data });

  return (
      <div className="form-group" id={props.name + 'Div'} data-controltype="grid2">
      <formRendererDeps.Grid2Component.Grid
        data={value.data}
        sizes={value.sizes}
        onChangeData={handelChangeData}
        readOnly={readOnly}
      />
    </div>
  );
};


