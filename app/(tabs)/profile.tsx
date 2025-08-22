import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function Profile() {
  return (
    <ScrollView
      className="bg-gray-50 p-6"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        <View className="mt-24">
          <Text className="text-3xl font-geist-semibold">
            Edit your profile
          </Text>
          <Text className="font-geist text-base">
            Make changes to your profile information
          </Text>
        </View>

        {/* Profile card */}
        <View className="bg-white rounded-lg shadow-xs py-6 px-2 flex flex-row gap-2 items-center mt-5">
          <View className="rounded-full">
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              className="w-20 h-20 rounded-full"
            />
          </View>
          <View>
            <Text className="font-geist-semibold text-neutral-900 text-2xl">
              Kelvin Kumordzi
            </Text>
            <Text className="text-neutral-600 text-base font-geist">
              kelvin.kumordzi@example.com
            </Text>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View className="my-32 flex justify-center items-center py-5 px-3 rounded-lg bg-[#1D3D47]">
        <Text className="text-white font-geist-medium">Save Changes</Text>
      </View>
    </ScrollView>
  );
}
