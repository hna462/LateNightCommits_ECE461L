#Task 1
def encrypt(inputText, N, D):
    rev = ""
    for i in range(len(inputText)):
        rev = inputText[i]+rev
    
    result = ""
    for i in range(len(rev)) :
        if(rev[i] != ' ' and rev[i] != '!') :
           if(D == 1):
               result += chr(ord(rev[i]) + N)
           elif(D == -1):
               result += chr(ord(rev[i]) - N)
        else:
            result += rev[i]
        
    return result

#Task 2
def decrypt(inputText, N, D):
    temp = ""
    for i in range(len(inputText)) :
        if(inputText[i] != ' ' and inputText[i] != '!') :
           if(D == 1):
               temp+= chr(ord(inputText[i]) - N)
           elif(D == -1):
               temp+= chr(ord(inputText[i]) + N)
        else:
            temp += inputText[i]

    result = ""
    for i in range(len(temp)):
        result = temp[i]+result
   
    return result


# 1. asmant: Temp123 and shakrel: Life15$ are present combinations in the database.txt file
# 2. aissa and bjha are present in the database.txt file, however, there passowrds don't match.
# 3. Ally! does not match the userid requirements.