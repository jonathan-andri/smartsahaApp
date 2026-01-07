import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { colorSelect } from '../colorSelector';
import { formatNumberShort } from '../formatNumberShort';
import type { ProductPreviewCardProps } from '../type/types';

export const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({ 
    title, 
    weight, 
    price, 
    image 
  }) => {
    const images = {
      ble: require('../../assets/images/ble.png'),
      mais: require('../../assets/images/mais.png'),
      raisin: require('../../assets/images/raisin.png'),
      fraise: require('../../assets/images/fraise.png'),
      vanille: require('../../assets/images/vanille.png'),
      cacao: require('../../assets/images/cacao.png'),
    };
    
    return (
    <View className={`${colorSelect(title)} rounded-3xl p-4 flex-row justify-between min-h-48`}>
      <View className="flex">
        <Text className="font-semibold text-3xl text-neutral-600">{title}</Text>
        <View className="flex-column items-start gap-2 mt-2">
          <View className="bg-white px-3 py-1 rounded-full">
            <Text className="text-lg">{weight} KG</Text>
          </View>
          <View className="bg-white pl-3 pr-1 py-1 rounded-full flex-row items-center justify-between w-[150px]">
            <Text className="text-lg">Ar {formatNumberShort(price)}</Text>
            <View className="bg-emerald-500 w-10 h-10 rounded-full items-center justify-center">
              <Ionicons name='pricetag' size={20} color={"white"} />
            </View>
          </View>
        </View>
      </View>
  
      <Image source={images[image as keyof typeof images]} className="w-40 h-40 rotate-45" resizeMode="contain" />
    </View>
  );
  }