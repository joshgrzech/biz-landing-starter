import { IconBaseProps } from "react-icons";
import * as FontAwesomeIcons from "react-icons/fa6";
const TinaIcon = (props: IconBaseProps) => {
  //@ts-ignore
  const IconComponent = FontAwesomeIcons[props.name];
  if (!IconComponent) return null;

  return <IconComponent size="30" className="text-gray-700" {...props} />;
};

export default TinaIcon;
