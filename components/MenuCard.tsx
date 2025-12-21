import { Text, TouchableOpacity, Platform } from 'react-native';
import { MenuItem } from '@/type';
import { appwriteConfig } from '@/lib/appwrite';
import { useCartStore } from '@/store/cart.store';
import { Image } from 'expo-image';

const MenuCard = ({ item: { $id, image_url, name, price } }: { item: MenuItem }) => {
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      className="menu-card"
      style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787' } : {}}>
      <Image
        source={image_url}
        contentFit="contain"
        style={{ position: 'absolute', top: -40, width: 128, height: 128 }}
      />
      <Text className="base-bold mb-2 text-center text-dark-100" numberOfLines={1}>
        {name}
      </Text>
      <Text className="body-regular mb-4 text-gray-200">From ${price}</Text>
      <TouchableOpacity
        onPress={() => addItem({ id: $id, name, price, image_url, customizations: [] })}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
