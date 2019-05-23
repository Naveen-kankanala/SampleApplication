var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Employe = {};
            $scope.Employe.EmpName = $scope.EmpName;
            $scope.Employe.EmpCity = $scope.EmpCity;
            $scope.Employe.EmpAge = $scope.EmpAge;
            $http({
                method: "post",
                url: "http://localhost:52358/Employee/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Emp_Name = "";
                $scope.Emp_City = "";
                $scope.Emp_Age = "";
            })
        } else {
            $scope.Employe = {};
            $scope.Employe.EmpName = $scope.EmpName;
            $scope.Employe.EmpCity = $scope.EmpCity;
            $scope.Employe.EmpAge = $scope.EmpAge;
            $scope.Employe.EmpID = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "http://localhost:52358/Employee/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Emp_Name = "";
                $scope.Emp_City = "";
                $scope.Emp_Age = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "http://localhost:52358/Employee/Get_AllEmployee"
        }).then(function (response) {
            $scope.employees = response.data;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "http://localhost:52358/Employee/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Emp) {
        document.getElementById("EmpID_").value = Emp.EmpID;
        $scope.EmpName = Emp.EmpName;
        $scope.EmpCity = Emp.EmpCity;
        $scope.EmpAge = Emp.EmpAge;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    }
})  