import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useNavPaths from "@/hooks/useNavPaths";
import wait from "@/utils/wait";
import PoiSidebar from "../_common/sidebar";
import SidebarInner from "../_common/SidebarInner";

function NewPoiSidebar() {
  const { routes, navigate } = useNavPaths();

  const handleClosePoi = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

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
        lat: "",
        long: "",
      },
      thumbnai: "",
      externalLinks: [],
      quizLinks: [],
      poiAssets: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    wait(1000).then(() => {
      navigate(`${routes.pois.one("new-poi-id")}`);
    });
  };

  return (
    <PoiSidebar onClose={handleClosePoi}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SidebarInner onClose={handleClosePoi} />
        </form>
      </FormProvider>
    </PoiSidebar>
  );
}

export default NewPoiSidebar;
