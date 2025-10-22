import { useWatch } from "react-hook-form";

import FollowPosition from "../map/utils/FollowPosition";

function MarkerInputFollower({ name }) {
  const value = useWatch({ name });

  console.log(value);

  return <FollowPosition coordinates={value} />;
}

export default MarkerInputFollower;
