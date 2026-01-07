import { ProductPreviewCard } from "@/components/cards/productView";
import { PaperSelectItem } from "@/components/type/types";
import { BottomBar } from "@/components/ui/buttonBar";
import SelectField from "@/components/ui/dropdown";
import { FadeUp } from "@/components/ui/fadeUp";
import { InputField } from "@/components/ui/inputField";
import React, { useState } from "react";

import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

/* ===================== Main Screen ===================== */
export default function CreateOfferScreen() {
  const [weight, setWeight] = useState<number>(100);
  const [location, setLocation] = useState<string>("Itsasy");
  const [price, setPrice] = useState<number>(10000);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [myItem, setMyItem] = useState<PaperSelectItem>({ _id: '', value: '', img:'' });

  const myItems: PaperSelectItem[] = [
    { _id: '1', value: 'Blé', img:'ble' },
    { _id: '2', value: 'Maïs', img:'mais'},
    { _id: '3', value: 'Raisin', img:'raisin'},
    { _id: '4', value: 'Fraise', img:'fraise'},
    { _id: '5', value: 'Vanille', img:'vanille' },
    { _id: '6', value: 'Cacao', img:'cacao' },
  ];

  const handleSelection = (value: { text: string }) => {
    setSelectedValue(value.text);
    setCurrentValue(value.text);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* Header */}
      <FadeUp>
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-semibold">Créer Une Offre</Text>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow">
            <Text className="text-lg">×</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* Preview */}
      <FadeUp delay={100}>
        <ProductPreviewCard 
          title={myItem.value} 
          weight={weight} 
          price={price} 
          image={myItem.img as any} 
        />
      </FadeUp>

      {/* Form */}
      <FadeUp delay={200}>
        <View className="gap-4 mt-6">
          <SelectField 
            data={myItems} 
            labelField="value"
            valueField="_id"
            placeholder="Choisir un produit" 
            value={myItem}
            onChangeSelect={(item: PaperSelectItem) =>{
              setMyItem(item);
            }}
          />
          <InputField 
            value={weight} 
            onChangeText={setWeight} 
            suffix="KG" 
          />
          <InputField 
            value={location} 
            onChangeText={setLocation} 
            icon="📍" 
          />
          <InputField 
            value={price} 
            onChangeText={setPrice} 
            suffix="Ar" 
          />
        </View>
      </FadeUp>

      {/* Bottom Bar */}
      <FadeUp delay={300}>
        <View className="mt-6 mb-6">
          <BottomBar onConfirm={() => {
            console.log("Offre confirmée:", {
              cereal: selectedValue,
              weight,
              location,
              price
            });
          }} />
        </View>
      </FadeUp>
    </View>
  );
}