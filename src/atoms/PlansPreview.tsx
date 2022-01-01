/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getCurrentUser, loadInviteeStatus, removePastPlans, addPastPlans } from '../res/utilFunctions';
import { DataStore } from '@aws-amplify/datastore';
import { Invitee, Plan, User } from '../models';
import { PlanCard } from './planCard';
import { NoPlansCard } from './NoPlansCard';

export const PlansPreview = () => {
  const [allSelected, setAllSelected] = useState(false);
  const [pendingSelected, setPendingSelected] = useState(false);
  const [acceptedSelected, setAcceptedSelected] = useState(false);
  const [createdSelected, setCreatedSelected] = useState(false);
  const [pastSelected, setPastSelected] = useState(false);
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [pendingPlans, setPendingPlans] = useState<Plan[]>([]);
  const [createdPlans, setCreatedPlans] = useState<Plan[]>([]);
  const [acceptedPlans, setAcceptedPlans] = useState<Plan[]>([]);
  const [pastPlans, setPastPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const plans = async () => {
      const user = await getCurrentUser();
      fetchPlans(user);
    };
    plans();
  }, []);

  const fetchPlans = async (user: User) => {
    console.log('Loading plans');
    const createdPlanOnDb = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));
    const createdPlans = createdPlanOnDb.map((plan) => plan);
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    const pastCreatedPlans = addPastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));

    const invitedPlans = removePastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );

    const pastInvitedPlans = addPastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );

    const pastPlans = [...pastCreatedPlans, ...pastInvitedPlans];
    const upcoming = invitedPlans.filter((item): item is Plan => item.creatorID !== user.id);

    const accepted = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      if (status === 'ACCEPTED') {
        accepted.push(plan);
      }
    }

    const pending = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      if (status === 'PENDING') {
        pending.push(plan);
      }
    }

    const all = [...pending, ...accepted, ...createdPlans];

    setAcceptedPlans(accepted);
    setCreatedPlans(createdPlans);
    setPendingPlans(pending);
    setAllPlans(all);
    setPastPlans(pastPlans);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.header}>Your Plans</Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ paddingLeft: 10, paddingBottom: 8 }} horizontal>
          <TouchableOpacity
            onPress={() => {
              setAllSelected(true);
              setPendingSelected(false);
              setAcceptedSelected(false);
              setCreatedSelected(false);
              setPastSelected(false);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: allSelected ? 'green' : 'transparent', marginHorizontal: 8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: allSelected ? '#31A59F' : '#8B8B8B' }]}>ALL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setAllSelected(false);
              setPendingSelected(true);
              setAcceptedSelected(false);
              setCreatedSelected(false);
              setPastSelected(false);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: pendingSelected ? 'green' : 'transparent', marginHorizontal: 8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: pendingSelected ? '#31A59F' : '#8B8B8B' }]}>PENDING</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setAllSelected(false);
              setPendingSelected(false);
              setAcceptedSelected(true);
              setCreatedSelected(false);
              setPastSelected(false);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: acceptedSelected ? 'green' : 'transparent', marginHorizontal: 8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: acceptedSelected ? '#31A59F' : '#8B8B8B' }]}>ACCEPTED</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setAllSelected(false);
              setPendingSelected(false);
              setAcceptedSelected(false);
              setCreatedSelected(true);
              setPastSelected(false);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: createdSelected ? 'green' : 'transparent', marginHorizontal: 8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: createdSelected ? '#31A59F' : '#8B8B8B' }]}>CREATED</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setAllSelected(false);
              setPendingSelected(false);
              setAcceptedSelected(false);
              setCreatedSelected(false);
              setPastSelected(true);
            }}
            style={[
              styles.selectedItem,
              { borderBottomColor: pastSelected ? 'green' : 'transparent', marginHorizontal: 8 },
            ]}
          >
            <Text style={[styles.buttonText, { color: pastSelected ? '#31A59F' : '#8B8B8B' }]}>PAST</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {createdSelected &&
        (createdPlans.length > 0 ? (
          createdPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              planId={plan.id}
              placeId={plan.placeID}
              location={plan.location}
              creator={true}
              creatorId={plan.creatorID}
            />
          ))
        ) : (
          <NoPlansCard />
        ))}

      {acceptedSelected &&
        (acceptedPlans.length > 0 ? (
          acceptedPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              placeId={plan.placeID}
              planId={plan.id}
              location={plan.location}
              invited={true}
              creatorId={plan.creatorID}
            />
          ))
        ) : (
          <NoPlansCard />
        ))}

      {pendingSelected &&
        (pendingPlans.length > 0 ? (
          pendingPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              placeId={plan.placeID}
              planId={plan.id}
              location={plan.location}
              creator={false}
              invited={false}
              creatorId={plan.creatorID}
            />
          ))
        ) : (
          <NoPlansCard />
        ))}

      {pastSelected &&
        (pastPlans.length > 0 ? (
          pastPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              placeId={plan.placeID}
              planId={plan.id}
              location={plan.location}
              creator={false}
              invited={false}
              creatorId={plan.creatorID}
            />
          ))
        ) : (
          <NoPlansCard />
        ))}

      {allSelected &&
        (allPlans.length > 0 ? (
          allPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              date={plan.date}
              placeId={plan.placeID}
              planId={plan.id}
              location={plan.location}
              creator={true}
              invited={false}
              creatorId={plan.creatorID}
            />
          ))
        ) : (
          <NoPlansCard />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderBottomWidth: 4,
    paddingHorizontal: 6,
    borderBottomColor: 'transparent',
  },
  container: {
    marginTop: 10,
  },
  subContainer: {
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    fontWeight: '600',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
