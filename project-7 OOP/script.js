document.querySelector("#info").addEventListener("submit", (Event) => {
    Event.preventDefault();
    const p_name = document.querySelector("#p_name").value;
    const p_mobile = document.querySelector("#p_mobile").value;
    const p_diseases = document.querySelector("#p_diseases").value;
    const p_r_name = document.querySelector("#p_r_name").value;
    const p_r_mobile = document.querySelector("#p_r_mobile").value;
    const p_r_relation = document.querySelector("#p_r_relation").value;

    var result = " ";
    class common {
        constructor(who, name, mobile) {
            this.who = who;
            this.name = name;
            this.mobile = mobile;
        }
        output() {
            result = `${this.who} name = ${this.name}, mobile = ${this.mobile},`;
        }
    }
    class patient extends common {
        constructor(who, name, mobile, diseases) {
            super(who, name, mobile);
            this.diseases = diseases;
        }
        output() {
            super.output();

            result += ` diseases = ${this.diseases}`;
        }
    }
    class relative extends common {
        constructor(who, name, mobile, relation) {
            super(who, name, mobile);
            this.relation = relation;
        }
        output() {
            super.output();

            result += ` relation = ${this.relation}`;
        }
    }
    const p1 = new patient("patient", p_name, p_mobile, p_diseases);
    p1.output();
    document.querySelector("#patient").innerHTML = result;
    const r1 = new relative("relative", p_r_name, p_r_mobile, p_r_relation);
    r1.output();
    document.querySelector("#relative").innerHTML = result;
});
