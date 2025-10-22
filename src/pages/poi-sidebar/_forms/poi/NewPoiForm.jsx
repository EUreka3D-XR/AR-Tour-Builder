import { FormProvider, useForm } from "react-hook-form";

import wait from "@/utils/wait";
import PoiForm from "../PoiForm";

function NewPoiForm() {
  const methods = useForm({
    defaultValues: {
      title: {
        locales: {
          en: "",
          fr: "",
        },
      },
      description: {
        locales: {
          en: "",
          fr: "",
        },
      },
      coordinates: {
        lat: 0,
        long: 0,
      },
      thumbnai: "",
      externalLinks: [],
      quizLinks: [],
      poiAssets: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    wait(1000).then(() => {
      console.log(data);
      // navigate(`${routes.pois.one("new-poi-id")}`);
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PoiForm />
      </form>
    </FormProvider>
  );
}

export default NewPoiForm;
