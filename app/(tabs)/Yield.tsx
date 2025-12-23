import SelectField from "@/components/ui/dropdown";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

/* ===================== Interfaces ===================== */
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
}

interface ProductPreviewCardProps {
  title: string;
  weight: number;
  price: number;
  image: ImageSourcePropType;
}

interface InputFieldProps {
  value: string;
  placeholder?: string;
  suffix?: string;
  icon?: string;
  onChangeText: (text: string) => void;
}

interface BottomBarProps {
  onConfirm: () => void;
}

interface PaperSelectItem {
  _id: string;
  value: string;
}

/* ===================== Reusable Animated Wrapper ===================== */
const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0 }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 450,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

/* ===================== Reusable Components ===================== */
const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({ 
  title, 
  weight, 
  price, 
  image 
}) => (
  <View className="bg-[#F3E3D6] rounded-3xl p-4 flex-row items-center justify-between">
    <View className="flex">
      <Text className="font-semibold text-5xl text-neutral-600">{title}</Text>
      <View className="flex-column items-start gap-2 mt-2">
        <View className="bg-white px-3 py-1 rounded-full">
          <Text className="text-lg">{weight} KG</Text>
        </View>
        <View className="bg-white pl-3 pr-1 py-1 rounded-full flex-row items-center justify-between w-[100px]">
          <Text className="text-lg">Ar {price}M</Text>
          <View className="bg-emerald-500 w-10 h-10 rounded-full items-center justify-center">
            <Ionicons name='pricetag' size={20} color={"white"} />
          </View>
        </View>
      </View>
    </View>
    <Image source={image} className="w-48 h-48 -rotate-90" resizeMode="contain" />
  </View>
);

const InputField: React.FC<InputFieldProps> = ({ 
  value, 
  placeholder, 
  suffix, 
  icon, 
  onChangeText 
}) => (
  <View className="flex-row items-center border border-neutral-200 rounded-full px-5 py-4">
    <TextInput 
      value={value} 
      onChangeText={onChangeText} 
      placeholder={placeholder} 
      className="flex-1" 
    />
    {suffix && <Text className="text-neutral-500">{suffix}</Text>}
    {icon && <Ionicons name="location" size={20} color="black" />}
  </View>
);

const BottomBar: React.FC<BottomBarProps> = ({ onConfirm }) => (
  <TouchableOpacity 
    onPress={onConfirm} 
    className="flex-row items-center justify-between bg-white rounded-full px-2 py-2 border border-neutral-200"
  >
    <TouchableOpacity className="px-8 py-3 rounded-full">
      <Text className="font-semibold text-3xl">Confirmer</Text>
    </TouchableOpacity>
    <TouchableOpacity className="bg-primary w-28 h-16 rounded-full items-center justify-center">
      <Ionicons name="pricetag" size={20} color={"white"}/>
    </TouchableOpacity>
  </TouchableOpacity>
);

/* ===================== Main Screen ===================== */
export default function CreateOfferScreen() {
  const [weight, setWeight] = useState<number>(100);
  const [location, setLocation] = useState<string>("Itsasy");
  const [price, setPrice] = useState<number>(10000);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [myItem, setMyItem] = useState<PaperSelectItem>({ _id: '', value: '' });

  const myItems: PaperSelectItem[] = [
    { _id: '1', value: 'Blé' },
    { _id: '2', value: 'Maïs' },
    { _id: '3', value: 'Riz' },
    { _id: '4', value: 'Soja' },
    { _id: '5', value: 'Orge' },
    { _id: '6', value: 'Avoine' },
    { _id: '7', value: 'Sorgho' },
    { _id: '8', value: 'Millet' },
    { _id: '9', value: 'Seigle' },
    { _id: '10', value: 'Quinoa' },
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
          image={require("../../assets/images/ble.png")} 
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
            onChangeSelect={(item) =>{
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


// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { PaperSelect } from 'react-native-paper-select';


// /* =====================
//    Reusable Animated Wrapper
// ===================== */
// const FadeUp = ({ children, delay = 0 }) => {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(24)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, {
//         toValue: 1,
//         duration: 450,
//         delay,
//         useNativeDriver: true,
//       }),
//       Animated.timing(translateY, {
//         toValue: 0,
//         duration: 450,
//         delay,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ opacity, transform: [{ translateY }] }}>
//       {children}
//     </Animated.View>
//   );
// };

// /* =====================
//    Reusable Components
// ===================== */

// const ProductPreviewCard = ({ title, weight, price, image }) => (
//   <View className="bg-[#F3E3D6] rounded-3xl p-4 flex-row items-center justify-between">
//     <View className="flex">
//       <Text className="font-semibold text-5xl text-neutral-600">{title}</Text>
//       <View className="flex-column items-start gap-2 mt-2">
//         <View className="bg-white px-3 py-1 rounded-full">
//           <Text className="text-lg">{weight} KG</Text>
//         </View>
//         <View className="bg-white pl-3 pr-1 py-1 rounded-full flex-row items-center justify-between w-[100px]">
//           <Text className="text-lg">Ar {price}M</Text>
//           <View className="bg-emerald-500 w-10 h-10 rounded-full items-center justify-center">
//             <Ionicons name='pricetag' color={"white"} />
//           </View>
//         </View>
//       </View>
//     </View>

//     <Image source={image} className="w-48 h-48 -rotate-90" resizeMode="contain" />
//   </View>
// );

// const InputField = ({ value, placeholder, suffix, icon, onChangeText }) => (
//   <View className="flex-row items-center border border-neutral-200 rounded-full px-5 py-4">
//     <TextInput
//       value={value}
//       onChangeText={onChangeText}
//       placeholder={placeholder}
//       className="flex-1"
//     />
//     {suffix && <Text className="text-neutral-500">{suffix}</Text>}
//     {icon && <Text className="ml-2">{icon}</Text>}
//   </View>
// );

// const SelectField = ({ value }) => (
//   <View className="flex-row items-center justify-between border border-neutral-200 rounded-full px-5 py-4">
//     <Text>{value}</Text>
//     <Text>▼</Text>
//   </View>
// );

// const BottomBar: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => (
//   <TouchableOpacity onPress={onConfirm} className="flex-row items-center justify-between bg-white rounded-full px-2 py-2 border border-neutral-200">
//     <TouchableOpacity  className="px-8 py-3 rounded-full">
//       <Text className="font-semibold text-3xl">Confirmer</Text>
//     </TouchableOpacity>

//     <TouchableOpacity className="bg-primary w-28 h-16 rounded-full items-center justify-center">
//       <Ionicons name="pricetag" size={20} color={"white"}/>
//     </TouchableOpacity>
//   </TouchableOpacity>
// );

// /* =====================
//    Main Screen
// ===================== */

// export default function CreateOfferScreen() {
//   const [weight, setWeight] = useState("56");
//   const [location, setLocation] = useState("Itsasy");
//   const [price, setPrice] = useState("2000000");
//   interface items {
//     _id: string,
//     value: string
//   }
//   const myitems : items[] = [
//     { _id: '1', value: 'Blé' },
//     { _id: '2', value: 'Maïs' },
//     { _id: '3', value: 'Riz' },
//     { _id: '4', value: 'Soja' },
//     { _id: '5', value: 'Orge' },
//     { _id: '6', value: 'Avoine' },
//     { _id: '7', value: 'Sorgho' },
//     { _id: '8', value: 'Millet' },
//     { _id: '9', value: 'Seigle' },
//     { _id: '10', value: 'Quinoa' },
//   ]

//   return (
//     <View className="flex-1 bg-white px-6 pt-12">
//       {/* Header */}
//       <FadeUp>
//         <View className="flex-row items-center justify-between mb-6">
//           <Text className="text-3xl font-semibold">Créer Une Offre</Text>
//           <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow">
//             <Text className="text-lg">×</Text>
//           </TouchableOpacity>
//         </View>
//       </FadeUp>

//       {/* Preview */}
//       <FadeUp delay={100}>
//         <ProductPreviewCard
//           title="Blé"
//           weight={56}
//           price={2}
//           image={require("../../assets/images/ble.png")}
//         />
//       </FadeUp>

//       {/* Form */}
//       <FadeUp delay={200}>
//         <View className="gap-4 mt-6">
//         <PaperSelect
//           label="Select Cereal"
//           // value={currentValue}
//           arrayList={myitems}
//           // onSelection={(value) => setSelectedValue(value.text)}
//           multiEnable={false}
//         />
//           <InputField value={weight} onChangeText={setWeight} suffix="KG" />
//           <InputField value={location} onChangeText={setLocation} icon="📍" />
//           <InputField value={price} onChangeText={setPrice} suffix="Ar" />
//         </View>
//       </FadeUp>

//       {/* Bottom Bar */}
//       <FadeUp delay={300}>
//         <View className="mt-6 mb-6">
//           <BottomBar onConfirm={() => {}} />
//         </View>
//       </FadeUp>
//     </View>
//   );
// }