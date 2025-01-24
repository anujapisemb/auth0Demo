import {FlashList} from '@shopify/flash-list';

type FlashListProps = React.ComponentProps<typeof FlashList>;

const FlatList = (props: FlashListProps) => {
    return (
        <FlashList
            estimatedItemSize={50}
            {...props}
        />
    );
};

export default FlatList;
