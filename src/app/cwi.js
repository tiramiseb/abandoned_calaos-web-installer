var CalaosWebInstaller = angular.module('CalaosWebInstaller', [
    'ui.bootstrap', 'ngDragDrop'
]);

function GlobalCtrl($scope, $http) {
    $scope.load_data = function() {
        $http.get('/config')
            .success(function(data) {
                $scope.config = data;
            }).error(function() {
                console.log('Error loading config')
            })
    }
    $scope.save_data = function() {
        $http.post('/config', $scope.config)
    }
    $scope.load_data();
    $scope.details = {
        'type': ''
    };
    $scope.selectedrule = '';
    $scope.roomtypes = ['Lounge', 'Kitchen', 'Bedroom'];
    $scope.operators = ['=', '≠', '>', '≥', '<', '≤'];
    $scope.inputvalues = ['true', 'false', 'changed'];

    ////////////////////////////////////////////////////////////// Rooms and IOs

    $scope.add_room = function() {
        newroom = {
            name: '',
            type: 'Lounge',
            inputs: [],
            outputs: []
        }
        $scope.config.io.push(newroom);
        $scope.room_details(newroom);
    }
    $scope.room_icon = function(room) {
        iconname = ''
        roomtypes.forEach(function(t) {
            if (room.type == t.name) {
                iconname = t.icon
            }
        });
        return iconname;
    }
    $scope.room_details = function(room) {
        $scope.details.room = room;
        $scope.details.type = 'room';
    }
    $scope.remove_room = function(room) {
        $scope.config.io.forEach(function(looproom, index) {
            if (looproom == room) {
                room_index = index
            }
        });
        $scope.config.io.splice(room_index, 1);
    }

    $scope.add_input = function(room) {
        newinput = {
            name: '',
            variable: '0'
        }
        room.inputs.push(newinput);
        $scope.input_details(newinput);
    }
    $scope.input_details = function(input) {
        $scope.details.input = input;
        $scope.details.type = 'input';
    }
    $scope.remove_input = function(input) {
        $scope.config.io.forEach(function(looproom, rindex) {
            looproom.inputs.forEach(function(loopinput, iindex) {
                if (loopinput == input) {
                    room_index = rindex;
                    input_index = iindex;
                };
            });
        });
        $scope.config.io[room_index].inputs.splice(input_index, 1);
    };

    $scope.add_output = function(room) {
        newoutput = {
            name: '',
            variable: '0'
        }
        room.outputs.push(newoutput);
        $scope.output_details(newoutput);
    }
    $scope.output_details = function(output) {
        $scope.details.output = output;
        $scope.details.type = 'output';
    }
    $scope.remove_output = function(output) {
        $scope.config.io.forEach(function(looproom, rindex) {
            looproom.outputs.forEach(function(loopoutput, iindex) {
                if (loopoutput == output) {
                    room_index = rindex;
                    output_index = iindex;
                };
            });
        });
        $scope.config.io[room_index].outputs.splice(output_index, 1);
    };

    ////////////////////////////////////////////////////////////////////// Rules

    $scope.add_rule = function() {
        newrule = {
            type: '',
            name: 'Rule',
            conditions: [],
            actions: []
        }
        if ($scope.details.type == 'room') {
            newrule.type = $scope.details.room.name;
        }
        if ($scope.details.type == 'input') {
            newrule.name = $scope.details.input.name;
            $scope.config.io.forEach(function(room) {
                room.inputs.forEach(function(input) {
                    if (input == $scope.details.input) {
                        newrule.type = room.name;
                    }
                });
            });
        }
        $scope.config.rules.push(newrule);
        $scope.rule_details(newrule);
    }
    $scope.rule_details = function(rule) {
        $scope.details.rule = rule;
        $scope.details.type = 'rule';
        $scope.selectedrule = rule;
    }
    $scope.remove_rule = function(rule) {
        $scope.config.rules.forEach(function(looprule, index) {
            if (looprule == rule) {
                rule_index = index
            }
        });
        $scope.config.rules.splice(rule_index, 1);
    }

    ///////////////////////////////////////////////////////////////// Conditions

    $scope.drop_on_condition = function($event, $data) {
        if ($data.type == 'input') {
            // $data.object is the dropped object
            newcondition = {
                input: $data.object,
                operator: '=',
                value: 'true'
            }
            $scope.selectedrule.conditions.push(newcondition);
            $scope.condition_details(newcondition);
        }
    }
    $scope.condition_details = function(condition) {
        $scope.details.condition = condition;
        $scope.details.type = 'condition';
    }
    $scope.remove_condition = function(condition) {
        $scope.config.rules.forEach(function(looprule, rindex) {
            looprule.conditions.forEach(function(loopcondition, cindex) {
                if (loopcondition == condition) {
                    rule_index = rindex;
                    condition_index = cindex;
                };
            });
        });
        $scope.config.rules[rule_index].conditions.splice(condition_index, 1);
    }

    //////////////////////////////////////////////////////////////////// Actions

    $scope.drop_on_action = function($event, $data) {
        if ($data.type == 'output') {
            // $data.object is the dropped object
            newaction = {
                output: $data.object,
                value: 'toggle'
            }
            $scope.selectedrule.actions.push(newaction);
            $scope.action_details(newaction);
        }
    }
    $scope.action_details = function(action) {
        $scope.details.action = action;
        $scope.details.type = 'action';
    }
    $scope.remove_action = function(action) {
        $scope.config.rules.forEach(function(looprule, rindex) {
            looprule.actions.forEach(function(loopaction, aindex) {
                if (loopaction == action) {
                    rule_index = rindex;
                    action_index = aindex;
                };
            });
        });
        $scope.config.rules[rule_index].actions.splice(action_index, 1);
    }
}