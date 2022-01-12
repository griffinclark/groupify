import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plan, User } from '../models';
import { PlanCard } from './planCard';
import { NoPlansCard } from './NoPlansCard';
import { TEAL, GRAY_DARK, WHITE } from '../res/styles/Colors';

export interface Props {
  all: Plan[];
  past: Plan[];
  pending: Plan[];
  accepted: Plan[];
  created: Plan[];
  user: User | undefined;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  reload: boolean;
}

enum SelectedOption {
  allSelected,
  pendingSelected,
  acceptedSelected,
  createdSelected,
  pastSelected,
}

export const PlansPreview: React.FC<Props> = ({
  reload,
  all,
  pending,
  accepted,
  created,
  past,
  navigation,
  user,
}: Props) => {
  const [state, setState] = useState<SelectedOption>(SelectedOption.allSelected);

  useEffect(() => {
    const loadPlans = async () => {
      switch (state) {
        case SelectedOption.allSelected:
          break;
        case SelectedOption.pendingSelected:
          break;
        case SelectedOption.acceptedSelected:
          break;
        case SelectedOption.createdSelected:
          break;
        case SelectedOption.pastSelected:
          break;
      }
    };
    loadPlans();
  }, [state, reload]);
  return (
    <View style={styles.container}>
      <View style={styles.scrollList}>
        <Text style={styles.header}>Your Plans</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <TouchableOpacity
            onPress={() => {
              setState(SelectedOption.allSelected);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: state === SelectedOption.allSelected ? TEAL : 'transparent' },
            ]}
          >
            <Text style={[styles.buttonText, { color: state === SelectedOption.allSelected ? TEAL : GRAY_DARK }]}>
              ALL({all.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState(SelectedOption.pendingSelected);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: state === SelectedOption.pendingSelected ? TEAL : 'transparent' },
            ]}
          >
            <Text style={[styles.buttonText, { color: state === SelectedOption.pendingSelected ? TEAL : GRAY_DARK }]}>
              PENDING({pending.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState(SelectedOption.acceptedSelected);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: state === SelectedOption.acceptedSelected ? TEAL : 'transparent' },
            ]}
          >
            <Text style={[styles.buttonText, { color: state === SelectedOption.acceptedSelected ? TEAL : GRAY_DARK }]}>
              ACCEPTED({accepted.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState(SelectedOption.createdSelected);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: state === SelectedOption.createdSelected ? TEAL : 'transparent' },
            ]}
          >
            <Text style={[styles.buttonText, { color: state === SelectedOption.createdSelected ? TEAL : GRAY_DARK }]}>
              CREATED({created.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState(SelectedOption.pastSelected);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: state === SelectedOption.pastSelected ? TEAL : 'transparent' },
            ]}
          >
            <Text style={[styles.buttonText, { color: state === SelectedOption.pastSelected ? TEAL : GRAY_DARK }]}>
              PAST({past.length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {SelectedOption.createdSelected === state ? (
        created.length > 0 ? (
          created.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              planId={plan.id}
              placeId={plan.placeID}
              location={plan.location}
              creator={true}
              creatorId={plan.creatorID}
              navigation={navigation}
              plan={plan}
            />
          ))
        ) : (
          <NoPlansCard user={user} navigation={navigation} />
        )
      ) : null}

      {SelectedOption.pendingSelected === state ? (
        pending.length > 0 ? (
          pending.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              planId={plan.id}
              placeId={plan.placeID}
              location={plan.location}
              creator={false}
              creatorId={plan.creatorID}
              navigation={navigation}
              plan={plan}
            />
          ))
        ) : (
          <NoPlansCard user={user} navigation={navigation} />
        )
      ) : null}

      {SelectedOption.acceptedSelected === state ? (
        accepted.length > 0 ? (
          accepted.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              planId={plan.id}
              placeId={plan.placeID}
              location={plan.location}
              creator={false}
              creatorId={plan.creatorID}
              navigation={navigation}
              invited={true}
              plan={plan}
            />
          ))
        ) : (
          <NoPlansCard user={user} navigation={navigation} />
        )
      ) : null}

      {SelectedOption.pastSelected === state ? (
        past.length > 0 ? (
          past.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              date={plan.date}
              planId={plan.id}
              placeId={plan.placeID}
              location={plan.location}
              creator={false}
              creatorId={plan.creatorID}
              navigation={navigation}
              plan={plan}
            />
          ))
        ) : (
          <NoPlansCard user={user} navigation={navigation} />
        )
      ) : null}

      {SelectedOption.allSelected === state ? (
        all.length > 0 ? (
          all.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              date={plan.date}
              planId={plan.id}
              placeId={plan.placeID}
              location={plan.location}
              creator={true}
              creatorId={plan.creatorID}
              navigation={navigation}
              plan={plan}
            />
          ))
        ) : (
          <NoPlansCard user={user} navigation={navigation} />
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderBottomWidth: 4,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  container: {
    marginTop: 10,
  },
  scrollList: {
    backgroundColor: WHITE,
  },
  header: {
    padding: 6,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
