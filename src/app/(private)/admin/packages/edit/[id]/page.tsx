import PackageForm from "@/components/functional/package-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function EditPackagePage() {
  return (
    <div>
      <PageTitle title='EditPackagePage' />
      <PackageForm formType='edit' />
    </div>
  );
}

export default EditPackagePage;
