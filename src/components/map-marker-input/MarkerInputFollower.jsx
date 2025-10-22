import { useWatch } from "react-hook-form";

import FollowPosition from "../map/utils/FollowPosition";

function MarkerInputFollower({ name }) {
  const value = useWatch({ name });

  return <FollowPosition coordinates={value} />;
}

export default MarkerInputFollower;
