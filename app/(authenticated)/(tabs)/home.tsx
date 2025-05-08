import Dropdown from "@/components/Dropdown";
import RoundButton from "@/components/RoundButton";
import Colors from "@/constants/Colors";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";
const Page = () => {
  const { balance, runTransaction, clearTransactions, transactions } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance().toLocaleString()}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon="add" text="Add money" onPress={onAddMoney} />
        <RoundButton
          icon="refresh"
          text="Exchange"
          onPress={clearTransactions}
        />
        <RoundButton icon="list" text="Details" />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions yet
          </Text>
        )}

        {transactions.map((t) => (
          <View
            key={t.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <View style={styles.circle}>
              <Ionicons
                name={t.amount > 0 ? "add" : "remove"}
                size={24}
                color={Colors.dark}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 400 }}>{t.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {t.date.toLocaleString()}
              </Text>
            </View>
            <Text>{t.amount}€</Text>
          </View>
        ))}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    marginBottom: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: 500,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "white",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
