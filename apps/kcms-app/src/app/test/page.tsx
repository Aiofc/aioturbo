"use client";

/**
 * 仅做页面拼接以及样式调整展示，后期删除
 */

import React, { useState } from "react";
import TreeFilter from "../../components/common/tree-filter/tree-filter.tsx";

export default function TestPage() {

  return (
      <>
        <div className="w-64">
          <TreeFilter />
        </div>
      </>

  );
}
