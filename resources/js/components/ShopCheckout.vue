<template>
    <paper title="Checkout">
        <val-observer v-slot="{ handleSubmit }">
            <form id="checkout-form" @submit.prevent="handleSubmit(onSubmit)">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <validation
                            rules="required"
                            v-slot="{ errors, classes }"
                        >
                            <label @click="sherlock" for="firstName"
                                >First Name</label
                            >
                            <input
                                v-model="firstName"
                                type="text"
                                class="form-control"
                                :class="classes"
                                id="first-name"
                                name="firstName"
                                placeholder="Sherlock"
                            />
                            <span>{{ errors.join(" ") }} </span>
                        </validation>
                    </div>
                    <div class="form-group col">
                        <validation
                            rules="required"
                            v-slot="{ errors, classes }"
                        >
                            <label for="lastName">Last Name</label>
                            <input
                                v-model="lastName"
                                type="text"
                                class="form-control"
                                :class="classes"
                                id="last-name"
                                name="lastName"
                                placeholder="Holmes"
                            />
                            <span>{{ errors.join(" ") }} </span>
                        </validation>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col form-group">
                        <validation
                            rules="required"
                            v-slot="{ errors, classes }"
                        >
                            <label for="street">Street</label>
                            <input
                                v-model="street"
                                type="text"
                                class="form-control"
                                :class="classes"
                                id="street"
                                name="street"
                                placeholder="Baker Street"
                            />
                            <span>{{ errors.join(" ") }} </span>
                        </validation>
                    </div>
                    <div class="form-group col-md-3">
                        <validation
                            rules="required|streetNumber"
                            v-slot="{ errors, classes }"
                        >
                            <label for="streetNumber">Street Number</label>
                            <input
                                v-model="streetNumber"
                                type="text"
                                class="form-control"
                                :class="classes"
                                id="street-number"
                                name="streetNumber"
                                placeholder="221b"
                            />
                            <span>{{ errors.join(" ") }} </span>
                        </validation>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <validation
                            rules="required|postalCode"
                            v-slot="{ errors, classes }"
                        >
                            <label for="postalCode">Postal Code</label>
                            <input
                                v-model="postalCode"
                                type="text"
                                class="form-control"
                                :class="classes"
                                id="postal-code"
                                name="postalCode"
                                placeholder="1234 AB"
                            />
                            <span>{{ errors.join(" ") }} </span>
                        </validation>
                    </div>
                    <div class="form-group col">
                        <validation
                            rules="required"
                            v-slot="{ errors, classes }"
                        >
                            <label for="City">City</label>
                            <input
                                v-model="city"
                                type="text"
                                class="form-control"
                                :class="classes"
                                id="city"
                                name="city"
                                placeholder="Amsterdam"
                            />
                            <span>{{ errors.join(" ") }} </span>
                        </validation>
                    </div>
                </div>
                <div class="form-group">
                    <validation
                        rules="required|phoneNr"
                        v-slot="{ errors, classes }"
                    >
                        <label for="phoneNumber">Phone Number</label>
                        <input
                            v-model="phoneNr"
                            type="text"
                            class="form-control"
                            :class="classes"
                            id="phone-nr"
                            name="phoneNr"
                            placeholder="0612345678"
                        />
                        <span>{{ errors.join(" ") }} </span>
                    </validation>
                </div>
                <div class="form-group">
                    <validation rules="required" v-slot="{ classes }">
                        <label for="dob">Date of Birth</label>
                        <input
                            v-model="dob"
                            type="date"
                            class="form-control"
                            :class="classes"
                            id="dob"
                            name="dob"
                            placeholder="01-01-1990"
                        />
                    </validation>
                </div>
                <div class="form-group">
                    <validation
                        rules="required|email"
                        v-slot="{ errors, classes }"
                    >
                        <label for="dob">Email address</label>
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            :class="classes"
                            id="email"
                            name="email"
                            placeholder="sherlockholmes@gmail.com"
                        />
                        <span>{{ errors.join(" ") }} </span>
                    </validation>
                </div>
            </form>

            <div class="button-container">
                <button
                    @click="$router.go(-1)"
                    class="back-button btn btn-secondary"
                >
                    Go Back
                </button>
                <button
                    type="submit"
                    form="checkout-form"
                    class="submit-button btn btn-success"
                >
                    Submit
                </button>
            </div>
        </val-observer>
    </paper>
</template>

<script>
import Paper from "./Paper";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "../validation";

const sherlock = {
    firstName: "Sherlock",
    lastName: "Holmes",
    street: "Baker Street",
    streetNumber: "221b",
    phoneNr: "0612345678",
    postalCode: "1234ab",
    city: "London",
    dob: "1820-05-22",
    email: "sherlock@holmes.co.uk"
};

export default {
    components: {
        validation: ValidationProvider,
        valObserver: ValidationObserver,
        Paper
    },

    data() {
        return {
            firstName: "",
            lastName: "",
            street: "",
            streetNumber: "",
            phoneNr: "",
            postalCode: "",
            city: "",
            dob: "1990-01-01",
            email: ""
        };
    },

    methods: {
        onSubmit(ev) {
            const customer = {
                firstName: this.firstName,
                lastName: this.lastName,
                street: this.street,
                streetNumber: this.streetNumber,
                phoneNr: this.phoneNr,
                postalCode: this.postalCode,
                city: this.city,
                dob: this.dob,
                email: this.email
            };
            const items = this.$store.state.cart.map(({ id, count }) => ({
                id,
                count
            }));

            this.$store.commit("setProcessing", true);
            axios
                .post("/api/order", {
                    customer,
                    items
                })
                .then(res => {
                    console.log(res);
                    this.$store.commit("setProcessing", false);
                });
            this.$router.push({ name: "confirm" });
        },
        sherlock() {
            this.firstName = sherlock.firstName;
            this.lastName = sherlock.lastName;
            this.street = sherlock.street;
            this.streetNumber = sherlock.streetNumber;
            this.phoneNr = sherlock.phoneNr;
            this.postalCode = sherlock.postalCode;
            this.city = sherlock.city;
            this.dob = sherlock.dob;
            this.email = sherlock.email;
        }
    }
};
</script>

<style lang="scss" scoped>
.back-button,
.submit-button {
    display: inline-block;
    padding: 10 30 10 30;
    font-size: 18px;
    width: 40%;
}

.form-control::placeholder {
    color: rgb(165, 165, 165);
}

.button-container {
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
}
</style>
