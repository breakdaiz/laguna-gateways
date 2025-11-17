import PackageForm from "@/components/functional/package-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function AddPackage() {
  return (
    <div>
      <PageTitle title='Add Package' />
      <PackageForm formType='add' />
    </div>
  );
}

export default AddPackage;
