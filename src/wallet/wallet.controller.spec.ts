import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '../auth/compay.enum';
import { jwtGuard } from '../auth/guards/authguard';
import { RoleGuard } from '../auth/guards/roleguard';
import { Role } from '../auth/guards/roles.decorator';
import { Currency, Payment_Method } from '../transactions/transaction.enum';
import { WalletController } from './wallet.controller';
import { FundwalletDto } from './wallet.dto';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  let controller: WalletController;
  let service:WalletService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers:[WalletService]
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service= module.get<WalletService>(WalletService)
  });




  

  describe('createWallet',()=>{
    it("should call service.createwallet with the ownerid and param and return the result", async ()=>{
      const ownerid="123";
      const expectedResult=["created wallet"];
      jest.spyOn(service,"createWallet").mockResolvedValue(expectedResult)

      const result = await controller.createWallet(ownerid,{});
      expect(service.createWallet).toHaveBeenCalledWith(ownerid)
      expect (result).toBe(expectedResult)
    })

  });

  describe("findallwallet",()=>{
    it("should call service.findallwallet and return the result ", async ()=>{
      const expectedResult= ["wallet 1", "wallet 2"];
      jest.spyOn(service, "findallwallet").mockResolvedValue(expectedResult)

      const result =await controller.findallwallet()
      expect(service.findallwallet).toHaveBeenCalled()
      expect(result).toBe(expectedResult)
    })
  })


  describe("findalltransactions",()=>{
    it("should call service.findalltransactions and return the result", async ()=>{
      const expectedResult= ["transaction 1","transaction 2"]
      jest.spyOn(service,"findalltransactions").mockResolvedValue(expectedResult)

      const result =await controller.findalltransactions()
      expect(service.findalltransactions).toHaveBeenCalled()
      expect(result).toBe(expectedResult)

    })
  })

  describe("fundwallet",()=>{
    it("should call pass the parameter of the userid and then dto of amount and the call service.fundwallet and retun the result",async ()=>{
      const walletID="123409"
      const fundwalletdto :FundwalletDto={amount:100, payment_method:Payment_Method.TRANSFER,currency:Currency.NGR }
      const expectedResult:any={message:"the wallet was succesfully funded "}
      jest.spyOn(service,"fundwallet").mockResolvedValue(expectedResult)

      const result= controller.fundwallet(walletID,fundwalletdto)
      expect(service.fundwallet).toHaveBeenCalledWith(walletID, fundwalletdto)
      expect(result).toBe(expectedResult)
    } );

    it("shouild have a master role authoorization", async ()=>{
      const walletID="123409"
      const fundwalletdto:FundwalletDto={amount:100, payment_method:Payment_Method.TRANSFER,currency:Currency.NGR }
      const expectedResult:any={message:"the wallet was succesfully funded "}
      jest.spyOn(service,"fundwallet").mockResolvedValue(expectedResult)

      const roleDecoratorSpy= jest.spyOn(Role.prototype, 'fundwalet')
      const roleguardSpy =jest.spyOn(RoleGuard.prototype,'canActivate')
      const useGuardSpy= jest.spyOn(jwtGuard.prototype, 'canActivate')
      const result =await controller.fundwallet(walletID,fundwalletdto)

      expect(useGuardSpy).toHaveBeenCalled()
      expect(roleguardSpy).toHaveBeenCalled()
      expect(roleDecoratorSpy).toHaveBeenCalledWith(Roles.MASTER)
      expect(result).toBe(expectedResult)

      

    })
  })

  describe("transferfunds",()=>{
    it("should pass the parameters of senderid , userid and the amout to be sent", async ()=>{
      const recieverID="wjwjwqbuwbuwb";
      const senderID="bhvhvwhjbwhb";
      const amount=200;
      const expectedResult:any= {message:`the transfer of the sum of ${amount} NGR from ${senderID} to ${recieverID} is successful`}
      jest.spyOn(service,"transfer").mockResolvedValue(expectedResult)

      const result =controller.transferfunds(recieverID, senderID, amount)
      expect(service.transfer).toHaveBeenCalledWith(recieverID,senderID,amount)
      expect(result).toBe(expectedResult)

    })

    it("shouild have a company role authoorization", async ()=>{
      const recieverID="wjwjwqbuwbuwb";
      const senderID="bhvhvwhjbwhb";
      const amount=200;
      const expectedResult:any= {message:`the transfer of the sum of ${amount} NGR from ${senderID} to ${recieverID} is successful`}
      jest.spyOn(service,"transfer").mockResolvedValue(expectedResult)

      const roleDecoratorSpy= jest.spyOn(Role.prototype, 'fundwalet')
      const roleguardSpy =jest.spyOn(RoleGuard.prototype,'canActivate')
      const useGuardSpy= jest.spyOn(jwtGuard.prototype, 'canActivate')
      const result =await controller.transferfunds(senderID,recieverID,amount)

      expect(useGuardSpy).toHaveBeenCalled()
      expect(roleguardSpy).toHaveBeenCalled()
      expect(roleDecoratorSpy).toHaveBeenCalledWith(Roles.COMPANY)
      expect(result).toBe(expectedResult)

      

    })
  })




});
