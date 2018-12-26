pragma solidity ^0.4.23;
contract Access{
    mapping(address => User) public addressToUsers;   
    mapping(uint => address) public idToAddr ;
    mapping(uint => User) public idToUser ;  
    mapping(address => string) private addressToFile;
    mapping(address => string) public addressToPassword;
    string private empty = ""; 
    uint256 public registeredUsers ;
    
    struct User{
        string name;
        uint id;
        address[] grantListIds;
        mapping(address => uint) grantPermission;      
        
    }
    
    // Register a new user if the user if not already registered
    // returns a true on successful registration
    function registerUser(string name,string pass) public returns(bool){
        string isReg = addressToPassword[msg.sender];
        // already registered
        if(keccak256(isReg) != keccak256(empty)){
            return false;
        }
        address reg = msg.sender;
      
        uint id = ++registeredUsers;
        User user;
        user.id = id;
        user.name = name;
            // Add to mapping
        addressToFile[reg] =  "This is a dummy file";
        addressToUsers[reg] = user;
        idToAddr[id] = reg;
        idToUser[id] = user;
        addressToPassword[reg] = pass;
        return true;
    }
    
    function login(string pass) view public returns(bool){
        string val = addressToPassword[msg.sender];
         if(keccak256(val) == keccak256(pass)){
            return true;
        }
        return false;
    }
    
    function resetState(User user) private{

        uint length = user.grantListIds.length;
        for(uint i = 0 ; i < length ; i++){
            delete user.grantListIds[i];
        }
             
    }
        
    function getGrantList() public view returns(address[]){
        address userAddress = msg.sender;
        User oldUser = addressToUsers[userAddress];
        address[] gList = oldUser.grantListIds;
        
        return gList;
    }
    
    function getPermissionBit(address add) public view returns(uint){
        address userAddress = msg.sender;
        User user = addressToUsers[userAddress];
        uint ans = user.grantPermission[add] ;
        return ans;
    }
    
    // Amend the patient grant list
    function editGrantList(uint[] ids , uint[] permission) public{
        address userAddress = msg.sender;
        User user = addressToUsers[userAddress];
        uint id = user.id;
        // flush the access list, client must send all ids again
        uint length = user.grantListIds.length;
        
        delete user.grantListIds;
 
         
        // refill the list
        for(uint i = 0 ; i < ids.length ; i++){
   
            user.grantListIds.push(idToAddr[ids[i]]); // maintain keys as address
            user.grantPermission[idToAddr[ids[i]]] = permission[i]; // address , permission bit
        }
        
        addressToUsers[userAddress] = user;            // set it back
        idToUser[id] = user;                      // set it back
         
    }
    
    // display a drop down and select a value , in the tutorial it was shown how to read value
    
    function requestAccess(address userAddress) public view returns(uint,string) {
         // user can access his own data with write access
        if(msg.sender == userAddress){
            return(1,getFile(userAddress));
        }
        
        address sender = msg.sender;        // this is the hospital
        User user = addressToUsers[userAddress];
        uint len = user.grantListIds.length;
        uint userPermit = 0;
        bool flag = false;
        for(uint i = 0 ; i < len ; i++){
            
            if(sender == user.grantListIds[i]){
                userPermit = user.grantPermission[sender];
                flag = true;
                break;
            }
        }
        
        if(flag && (userPermit == 1 || userPermit == 0)){
            return(userPermit,getFile(userAddress));
        }else{
            return(2,"Access Denied");
        }
    }
    
    // We can merge this later with the requestAccess function.
    // make this private and then use the user object fetched in the requestAccess function to fetch the file
    function getFile(address userAddress) public view returns(string) {
        string file = addressToFile[userAddress];
        return file;
    }
    
    function saveFile(address userAddress,string file_content) public {
        address sender = msg.sender;        // this is the hospital
        User user = addressToUsers[userAddress];
        // check if the sender has the correct rights
        uint len = user.grantListIds.length;
        uint userPermit = 0;
        bool flag = false;
        for(uint i = 0 ; i < len ; i++){
            if(sender == user.grantListIds[i]){
                userPermit = user.grantPermission[sender];
                flag = true;
                break;
            }
        }
        if(flag && (userPermit == 1 )){
            
            addressToFile[userAddress] = file_content;
        
        }
    }
    
    function getName() view public returns(string){
        User user = addressToUsers[msg.sender];
        return user.name;
    }
}

    
