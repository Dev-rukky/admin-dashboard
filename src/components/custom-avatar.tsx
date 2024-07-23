import { useGetIdentity } from "@refinedev/core";
import { Avatar as AntdAvatar, AvatarProps } from "antd";
import type { User } from '@/graphql/schema.types'

type Props = AvatarProps & {
    name: string;
}

const CustomAvatar = ({ name, styles, ...rest }: Props) => {
    const {data: user} = useGetIdentity<User>()
  return (
    <AntdAvatar 
        alt="Dev Rukky" 
        size="small" 
        style={{ 
            backgroundColor: '#87d068',
            display: 'flex',
            alignItems: 'center',
            border: 'none'
        }}>
        {name}
    </AntdAvatar>
  );
};

export default CustomAvatar;
